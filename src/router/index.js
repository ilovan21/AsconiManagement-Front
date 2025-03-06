import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import Reservation from "@/components/Reservation.vue";
import AuthPage from "@/pages/AuthPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import ListReservations from "@/components/ListReservations.vue";
import ExperiencePage from "@/pages/ExperiencePage.vue";
import ServiceReservationPage from "@/pages/ServiceReservationPage.vue";
import RestaurantPage from "@/pages/RestaurantPage.vue";

const routes = [
    { path: "/", name: "home", component: HomePage },
    { path: "/reservation", name: "reservation", component: Reservation },
    { path: "/auth", name: "auth", component: AuthPage },
    { path: "/experiences", name: "Experiences", component: ExperiencePage },
    { path: "/restaurant", name: "Restaurant", component: RestaurantPage },
    {
        path: "/reservation/:id",
        name: "ServiceReservationPage",
        component: ServiceReservationPage,
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
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    if (to.meta.requiresAuth && !token) {
        next("/login");
    } else {
        next();
    }
});

export default router;