<template>
    <div>
        <h1 class="page-header">Room</h1>

        <ul class="tab__navigation">
            <li v-for="room in rooms">
                <router-link class="tab__navigation__item" :to='{name: "showBand", params: {id: room.id}}'>
                    {{ room.name }}
                </router-link>
            </li>
        </ul>
        <div class="tab__content">
            <div v-for="room in rooms">
                <div :id="'tab' + room.id">
                    <app-device :devices="room.devices"></app-device>
                </div>
            </div>
        </div>
    </div>
</template>

<script charset="utf-8">
    export default {
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
            fetchData: function() {
                let self = this;

                fetch('/api/rooms/')
                    .then((resp) => resp.json()) // Transform the data into json
                    .then(function(data) {
                        console.log(data)
                        self.rooms = data
                    })
            }
        }
    };
</script>