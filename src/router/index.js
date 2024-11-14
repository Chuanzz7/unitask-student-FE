import {createRouter, createWebHistory} from "vue-router";
import NotFoundView from "@/views/NotFoundView.vue";
import Login from "@/views/Auth/Login.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: NotFoundView,
            auth: true
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
});

router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        // !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        // redirect the user to the login page
        return { name: 'Login' }
    }
})

export default router;