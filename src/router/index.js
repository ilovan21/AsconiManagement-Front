import {createRouter, createWebHistory} from "vue-router";
import Home from "@/components/Home.vue";
import Reservation from "@/components/Reservation.vue";
import Auth from "@/components/Auth.vue";

const router = new createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/reservation',
            name: 'reservation',
            component: Reservation
        },
        {
            path: '/auth',
            name: 'auth',
            component: Auth
        }
    ],
})
export default router