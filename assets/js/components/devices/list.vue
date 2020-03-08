<template>
    <div>
        <app-header :title="`Devices`"></app-header>

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
                    <span class="list__item__edit"></span>
                    <span class="list__item__delete"></span>
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