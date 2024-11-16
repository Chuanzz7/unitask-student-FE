import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from '@/stores/auth';

import NotFoundView from "@/views/NotFoundView.vue";
import Login from "@/views/Auth/LoginView.vue";
import Dashboard from "@/components/Dashboard.vue";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            meta: {
                requiresAuth: false,
            }
        },
        {
            path: '/',
            component: DefaultLayout,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    component: Dashboard,
                },
                // Add more child routes as needed
            ],
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    if(to.name === '/login'){
        //sign out
        authStore.logout();
        next()
    }
    if (to.meta.requiresAuth) {
        //token check
        if (authStore.isAuthenticated) {
            next()
        } else {
            //token check
            next({name: 'Login'});
        }
    } else {
        next();
    }
})

export default router;