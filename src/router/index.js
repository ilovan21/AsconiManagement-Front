import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import Reservation from "@/components/Reservation.vue";
import AuthPage from "@/pages/AuthPage.vue";
import GuestHousePage from "@/pages/GuestHousePage.vue";
import AdminPage from "@/pages/AdminPages/AdminPage.vue";
import ListReservations from "@/components/ListReservations.vue";
import ExperiencePage from "@/pages/ExperiencePage.vue";
import ServiceReservationPage from "@/pages/ServiceReservationPage.vue";
import RestaurantPage from "@/pages/RestaurantPage.vue";
import HallsPage from "@/pages/HallsPage.vue";
import RestaurantReservationPage from "@/pages/RestaurantReservationPage.vue";
import AdminListPage from "@/pages/AdminListPage.vue";
import RestaurantManagement from "@/pages/AdminPages/RestaurantManagement.vue";
import RestaurantBookingListing from "@/pages/AdminPages/RestaurantBookingListing.vue";
import TourismBookingListing from "@/pages/AdminPages/TourismBookingListing.vue";
import TourismOverview from "@/pages/AdminPages/TourismOverview.vue";
import TourismManagement from "@/pages/AdminPages/TourismManagement.vue";
import EventsPage from "@/pages/EventsPage.vue";
import GalleryPage from "@/pages/GalleryPage.vue";
import CSRPage from "@/pages/CSRPage.vue";

const routes = [
    { path: "/", name: "home", component: HomePage },
    { path: "/reservation", name: "reservation", component: Reservation },
    { path: "/auth", name: "auth", component: AuthPage },
    { path: "/experiences", name: "Experiences", component: ExperiencePage },
    { path: "/restaurant", name: "Restaurant", component: RestaurantPage },
    { path: "/wines", name: "Wines", component: HomePage },
    { path: "/hall", name: "Halls", component: HallsPage },
    { path: "/guesthouse", name: "GuestHouse", component: GuestHousePage },
    { path: "/events", name: "Events", component: EventsPage },
    { path: "/gallery", name: "Gallery", component: GalleryPage },
    { path: "/csr", name: "Csr", component: CSRPage },

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
        path: "/overview/restaurant",
        name: "AdminRestaurantOverview",
        component: AdminPage,
        meta: { requiresAuth: true }
    },
    {   path: "/overview/tourism",
        name: "TourismOverview",
        component: TourismOverview,
        meta: { requiresAuth: true }
    },
    {
        path: "/management/restaurant",
        name: "RestaurantManagement",
        component: RestaurantManagement,
        meta: { requiresAuth: true }
    },
    {
        path: "/management/tourism",
        name: "TourismManagement",
        component: TourismManagement,
        meta: { requiresAuth: true }
    },
    {
        path: "/listing/tourism",
        name: "TourismBookingListing",
        component: TourismBookingListing,
        meta: { requiresAuth: true }
    },
    {
        path: "/listing/restaurant",
        name: "RestaurantBookingListing",
        component: RestaurantBookingListing,
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
            return {top: 0};
        }
    }
});

export default router;