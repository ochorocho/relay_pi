import Vue from "vue";
import VueRouter from "router";
Vue.use(VueRouter);

import BandComponent from "./components/bands.vue";
import DeviceComponent from "./components/device.vue";
import DashboardComponent from "./components/dashboard.vue";
import MembersComponent from "./components/members.vue";
import VueProgressBar from 'vue-progressbar'

Vue.component('app-device', DeviceComponent)

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    thickness: '4px'
})

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