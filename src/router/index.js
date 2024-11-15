import {createRouter, createWebHistory} from "vue-router";
import { useAuthStore } from '@/stores/auth';

import NotFoundView from "@/views/NotFoundView.vue";
import Login from "@/views/Auth/LoginView.vue";
import Home from "@/views/HomeView.vue";

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
            name: 'home',
            component: Home,
            meta: {
                requiresAuth: false,
            }
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

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