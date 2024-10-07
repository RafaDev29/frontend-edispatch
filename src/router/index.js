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
                // {
                //     name: "products",
                //     path: "/products",
                //     component: () => import("@/views/ProductView.vue"),
                // },
            
       
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
        if (store.state.role === "administrador") {
            next({ name: 'products' });
           
        } else if (store.state.role === "administrator") {

            next({ name: '' });
        } else {
            next();
        }
    } else if (to.path === '/' && store.state.isAuthenticated) {
        // Si el usuario está autenticado y accede a la raíz, redirigir según su rol
        if (store.state.role === "administrator") {
            next({ name: 'products' });
        } else if (store.state.role === "administratora") {
            next({ name: 'products' });
        } else {
            next();
        }
    } else {
       
        next();
    }
});

export default router;
