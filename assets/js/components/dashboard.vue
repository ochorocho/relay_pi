<template>
    <div>
        <app-header :title="`Dashboard`"></app-header>

        <ul class="tab__navigation">
            <li class="tab__navigation__item" v-for="room in rooms" v-on:click="switchTab('tab' + room.id)">
                {{ room.name }}
            </li>
        </ul>
        <div class="tab__content" v-for="(room, index) in rooms">
            <div class="tab" :id="'tab' + room.id" :class="{ 'tab--hidden' : index > 0}">
                <app-device :devices="room.devices"></app-device>
            </div>
        </div>
    </div>
</template>

<script charset="utf-8">
    export default {
        mounted() {
            this.$Progress.start()
        },
        data() {
            return {
                rooms: []
            };
        },

        created() {
            this.fetchData();
        },

        watch: {
            $route: "fetchData"
        },

        methods: {
            switchTab(tab) {
                let all = document.querySelectorAll('.tab__content .tab');
                $.each(all, function(key, value) {
                    value.style.display = 'none'
                });

                let currentTab = document.querySelector('#' + tab);
                currentTab.style.display = 'block'
            },
            fetchData: function() {
                let self = this;

                fetch('/api/rooms/')
                    .then((resp) => resp.json())
                    .then(function(data) {
                        self.rooms = data
                        self.$Progress.finish()
                    })
            }
        }
    };
</script>