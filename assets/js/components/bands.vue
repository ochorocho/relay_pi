<template>
    <div>
        <h1 class="page-header">Room</h1>

        <app-device></app-device>

        <ul class="list-unstyled">
            <li v-for="room in rooms">
                <router-link :to='{name: "showBand", params: {id: room.id}}'>
                    <h2>
                        {{ room.name }}
                    </h2>
                </router-link>
            </li>
        </ul>
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
                        self.rooms = data
                    })
            }
        }
    };
</script>