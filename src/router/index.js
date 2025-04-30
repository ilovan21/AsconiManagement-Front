import {createRouter, createWebHistory} from "vue-router";
import HomePage from "@/pages/clientPages/HomePage.vue";
import AuthPage from "@/pages/clientPages/AuthPage.vue";
import GuestHousePage from "@/pages/clientPages/GuestHousePage.vue";
import AdminPage from "@/pages/adminPages/AdminPage.vue";
import ListReservations from "@/components/pageElements/ListReservations.vue";
import ExperiencePage from "@/pages/clientPages/ExperiencePage.vue";
import ServiceReservationPage from "@/pages/clientPages/ServiceReservationPage.vue";
import RestaurantPage from "@/pages/clientPages/RestaurantPage.vue";
import HallsPage from "@/pages/clientPages/HallsPage.vue";
import RestaurantReservationPage from "@/pages/clientPages/RestaurantReservationPage.vue";
import AdminListPage from "@/pages/adminPages/AdminListPage.vue";
import RestaurantManagement from "@/pages/adminPages/RestaurantManagement.vue";
import RestaurantBookingListing from "@/pages/adminPages/RestaurantBookingListing.vue";
import TourismBookingListing from "@/pages/adminPages/TourismBookingListing.vue";
import TourismOverview from "@/pages/adminPages/TourismOverview.vue";
import TourismManagement from "@/pages/adminPages/TourismManagement.vue";
import EventsPage from "@/pages/clientPages/EventsPage.vue";
import GalleryPage from "@/pages/clientPages/GalleryPage.vue";
import CSRPage from "@/pages/clientPages/CSRPage.vue";

const routes = [
    {path: "/", name: "home", component: HomePage},
    {path: "/auth", name: "auth", component: AuthPage},
    {path: "/experiences", name: "Experiences", component: ExperiencePage},
    {path: "/restaurant", name: "Restaurant", component: RestaurantPage},
    {path: "/wines", name: "Wines", component: HomePage},
    {path: "/hall", name: "Halls", component: HallsPage},
    {path: "/guesthouse", name: "GuestHouse", component: GuestHousePage},
    {path: "/events", name: "Events", component: EventsPage},
    {path: "/gallery", name: "Gallery", component: GalleryPage},
    {path: "/csr", name: "Csr", component: CSRPage},

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
        meta: {requiresAuth: true}
    },
    {
        path: "/overview/tourism",
        name: "TourismOverview",
        component: TourismOverview,
        meta: {requiresAuth: true}
    },
    {
        path: "/management/restaurant",
        name: "RestaurantManagement",
        component: RestaurantManagement,
        meta: {requiresAuth: true}
    },
    {
        path: "/management/tourism",
        name: "TourismManagement",
        component: TourismManagement,
        meta: {requiresAuth: true}
    },
    {
        path: "/listing/tourism",
        name: "TourismBookingListing",
        component: TourismBookingListing,
        meta: {requiresAuth: true}
    },
    {
        path: "/listing/restaurant",
        name: "RestaurantBookingListing",
        component: RestaurantBookingListing,
        meta: {requiresAuth: true}
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        if (to.hash) {
            return {el: to.hash}
        }
        return { top: 0 }
    }
});

export default router;