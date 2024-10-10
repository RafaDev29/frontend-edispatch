import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            meta: {
                title: "Home",
                requiresAuth: true
            },
            path: "/",
            component: () => import("@/layouts/MasterLayout.vue"),
            children: [
                 {
                    name: "master",
                    path: "/master",
                 component: () => import("@/views/MasterView.vue"),
                 },
                 {
                    name: "company",
                    path: "/company",
                 component: () => import("@/views/CompanyView.vue"),
                 },
            
       
            ]
        },
        {
            meta: {
                title: "Login"
            },
            path: "/login",
            name: "login",
            component: () => import("@/views/LoginView.vue")
        },
      
        {
            path: '/:pathMatch(.*)*', // Cualquier ruta no especificada
            redirect: '/login' // Redirigir a login
        }
    ]
})

// Navigation Guard  
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !store.state.isAuthenticated) {
      
        next({ name: 'login' });
    } else if (to.name === 'login' && store.state.isAuthenticated) {
        // Si el usuario ya está autenticado y trata de acceder al login, redirigir según su rol
        if (store.state.role === "ROOT") {
            next({ name: 'master' });
           
        } else if (store.state.role === "MASTER") {

            next({ name: 'company' });
        }else if (store.state.role === "COMPANY") {

            next({ name: 'company' });
        }else {
            next();
        }
    } else if (to.path === '/' && store.state.isAuthenticated) {
        // Si el usuario está autenticado y accede a la raíz, redirigir según su rol
        if (store.state.role === "ROOT") {
            next({ name: 'master' });
        } else if (store.state.role === "MASTER") {
            next({ name: 'company' });
        } else if (store.state.role === "COMPANY") {
            next({ name: 'Company' });
        }else {
            next();
        }
    } else {
       
        next();
    }
});

export default router;
