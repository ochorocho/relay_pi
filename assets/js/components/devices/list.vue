<template>
    <div>
        <app-header :title="`Devices`" link="/devices/new"></app-header>

        <div class="list">
            <div class="list__item--head">
                <div class="list__item__name">Name</div>
                <div class="list__item__number">Room</div>
                <div class="list__item__action">Actions</div>
            </div>
            <div class="list__item" v-for="(device, index) in devices">
                <div class="list__item__name">{{device.name}}</div>
                <div class="list__item__number">{{device.room.name}}</div>
                <div class="list__item__action">
                    <router-link class="list__item__edit" :to="`/devices/${device.id}/edit`">e</router-link>
                    <span v-on:click="deleteDevice(device.id)" class="list__item__delete">d</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                devices: []
            };
        },
        created() {
            this.fetchData();
        },
        methods: {
            deleteDevice(id) {
                let self = this;
                self.$Progress.start()

                console.log(id)

                fetch(`/api/devices/${id}`, {
                    method: 'delete'
                }).then(function(resp) {
                    if(resp.status == 200) {
                        self.fetchData();
                        self.$Progress.finish()
                    } else {
                        alert('Failed to delete item')
                    }
                })
            },
            fetchData: function() {
                let self = this;

                fetch('/api/devices/')
                    .then((resp) => resp.json())
                    .then(function(data) {
                        self.$log(data)
                        self.devices = data
                        self.$Progress.finish()
                    })
            }
        }
    }
</script>

<style scoped>

</style>