import Vue from "vue";
import VueRouter from "router";
Vue.use(VueRouter);

import BandComponent from "./components/bands.vue";
import DeviceComponent from "./components/device.vue";
import DashboardComponent from "./components/dashboard.vue";
import MembersComponent from "./components/members.vue";

Vue.component('app-device', DeviceComponent)

const routes = [
    {path: "/band/:id", component: MembersComponent, name: "showBand"},
    {path: "/", component: DashboardComponent}
];

const router = new VueRouter({
    mode: "history",
    routes
});

const app = new Vue({
    router
}).$mount("#app");