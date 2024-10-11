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
                 {
                    name: "cisterns",
                    path: "/cisterns",
                 component: () => import("@/views/CisternsView.vue"),
                 },
                 {
                    name: "customers",
                    path: "/customers",
                 component: () => import("@/views/CustomerView.vue"),
                 },
                 {
                    name: "billing",
                    path: "/billing",
                 component: () => import("@/views/BillingView.vue"),
                 },
                 {
                    name: "driver",
                    path: "/driver",
                 component: () => import("@/views/DriversView.vue"),
                 },
                 {
                    name: "addressees",
                    path: "/addressees",
                 component: () => import("@/views/AddresseesView.vue"),
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
            path: '/:pathMatch(.*)*', 
            redirect: '/login' 
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

            next({ name: 'cisterns' });
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
            next({ name: 'cisterns' });
        }else {
            next();
        }
    } else {
       
        next();
    }
});

export default router;
