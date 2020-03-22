import Vue from "vue"
import VueRouter from "router"
import VueProgressBar from 'vue-progressbar'
import SliderComponent from './components/slider.vue'

Vue.use(VueRouter)

import GroupListComponent from "./components/groups/list.vue"
import GroupNewComponent from "./components/groups/new.vue"
import GroupEditComponent from "./components/groups/edit.vue"
import DeviceListComponent from "./components/devices/list.vue"
import DeviceNewComponent from "./components/devices/new.vue"
import DeviceEditComponent from "./components/devices/edit.vue"
import PinListComponent from "./components/pins/list.vue"
import PinNewComponent from "./components/pins/new.vue"
import PinEditComponent from "./components/pins/edit.vue"
import DeviceComponent from "./components/device.vue"
import DashboardComponent from "./components/dashboard.vue"
import HeaderComponent from "./components/header.vue"
import OffcanvasComponent from "./components/offcanvas.vue"

Vue.component('app-device', DeviceComponent)
Vue.component('app-header', HeaderComponent)
Vue.component('app-offcanvas', OffcanvasComponent)
Vue.component('app-slider', SliderComponent)

Vue.use(VueProgressBar, {
    color: '#dedede',
    failedColor: 'red',
    thickness: '4px'
})

Vue.prototype.$log = function(message) {
    let timeNow = '[' + new Date(Date.now()).toLocaleTimeString() + ']'
    process.env.NODE_ENV == 'development' && console.log(timeNow + ' ' + JSON.stringify(message))
};

const routes = [
    {path: "/groups/new", component: GroupNewComponent, name: "newGroup"},
    {path: "/groups/:id/edit", component: GroupEditComponent, name: "editGroup"},
    {path: "/groups/", component: GroupListComponent, name: "listGroup"},
    {path: "/devices/new", component: DeviceNewComponent, name: "newDevice"},
    {path: "/devices/:id/edit", component: DeviceEditComponent, name: "editDevice"},
    {path: "/devices/", component: DeviceListComponent, name: "listDevice"},
    {path: "/pins/new", component: PinNewComponent, name: "newPin"},
    {path: "/pins/:id/edit", component: PinEditComponent, name: "editPin"},
    {path: "/pins/", component: PinListComponent, name: "listPin"},
    {path: "/", component: DashboardComponent, name: 'dashboard'}
];

const router = new VueRouter({
    mode: "history",
    routes
});

const app = new Vue({
    router
}).$mount("#app");