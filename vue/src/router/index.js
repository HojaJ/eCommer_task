import { createRouter, createWebHistory } from 'vue-router';
import BackendLayout from '@/components/BackendLayout.vue';
import FrontendLayout from '@/components/FrontendLayout.vue';
import AuthLayout from '@/components/AuthLayout.vue';
import Products from '@/views/Products.vue';
import ProductView from '@/views/ProductView.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

import HomePage from '@/views/HomePage.vue';
import store from "../store";

const routes = [
    {
        path: "/home",
        redirect: "/",
        component: FrontendLayout,
        children: [
            {path: "/", name: "HomePage", component: HomePage},
            // {path: "/home", name: "HomePage", component: HomePage},
        ]
    },
    {
        path: "/admin",
        redirect: '/products',
        component: BackendLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "/products", name: "Products", component: Products },
            { path: "/product/create", name: "ProductCreate", component: ProductView },
            { path: "/product/:id", name: "ProductView", component: ProductView },
        ]
    },
    {
        path: "/admin",
        redirect: "/login",
        name: "Auth",
        component: AuthLayout,
        meta: { isGuest: true },
        children: [
            {
                path: "/login",
                name: "Login",
                component: Login,
            },
            {
                path: "/register",
                name: "Register",
                component: Register
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else {
        next();
    }
});


export default router;
