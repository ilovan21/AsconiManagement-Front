import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import Reservation from "@/components/Reservation.vue";
import AuthPage from "@/pages/AuthPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import ListReservations from "@/components/ListReservations.vue";
import ExperiencePage from "@/pages/ExperiencePage.vue";
import ServiceReservationPage from "@/pages/ServiceReservationPage.vue";
import RestaurantPage from "@/pages/RestaurantPage.vue";
import HallsPage from "@/pages/HallsPage.vue";
import RestaurantReservationPage from "@/pages/RestaurantReservationPage.vue";

const routes = [
    { path: "/", name: "home", component: HomePage },
    { path: "/reservation", name: "reservation", component: Reservation },
    { path: "/auth", name: "auth", component: AuthPage },
    { path: "/experiences", name: "Experiences", component: ExperiencePage },
    { path: "/restaurant", name: "Restaurant", component: RestaurantPage },
    { path: "/wines", name: "Wines", component: HomePage },
    { path: "/hall", name: "Halls", component: HallsPage },
    {
        path: "/reservation/:id",
        name: "ServiceReservationPage",
        component: ServiceReservationPage,
        props: true
    },
    {
        path: "/restaurant-reservation/:id",
        name: "RestaurantReservationPage",
        component: RestaurantReservationPage,
        props: true
    },
    {
        path: "/admin",
        name: "admin",
        component: AdminPage,
        meta: { requiresAuth: true }
    },
    {
        path: "/list",
        name: "ReservationList",
        component: ListReservations,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

export default router;