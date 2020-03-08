<template>
    <ul class="devices">
        <li class="devices__item" :id="'device' + device.id" v-for="device in devices">
            <div class="devives__inner">
                <div class="devices__buttongroup">
                    <div v-on:click="off(device.id)" class="devices__button--off">OFF</div>
                    <div v-on:click="on(device.id)" class="devices__button--on">ON</div>
                </div>
                <div class="devices__title">
                    {{ device.name }}
                </div>
                <app-slider></app-slider>
            </div>
        </li>
    </ul>
</template>

<script charset="utf-8">
    export default {
        props: ['devices'],
        data() {
            return {};
        },
        methods: {
            on(device) {
                this.$log('Device on, id: ' + device)
            },
            off(device) {
                this.$log('Device off, id: ' + device)
            }
        }
    };
</script>