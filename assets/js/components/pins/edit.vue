<template>
    <div>
        <app-header :title="`Edit pin`"></app-header>

        <div class="new-item">
            <label>
                <span class="new-item__label">Name</span>
                <span class="new-item__field">
                    <input type="text" v-model="pin.name">
                </span>
            </label>
            <label>
                <span class="new-item__label">Pin</span>
                <span class="new-item__field">
                    <select v-model="pin.pin_number">
                        <option value="0">select ... {{pin.pin_number}}</option>
                        <template v-for="pinSelect in availablePins">
                            <template v-if="pinSelect === pin.pin_number">
                               <option :value="pinSelect" selected="selected">GPIO {{pinSelect}}</option>
                            </template>
                            <template v-else>
                                <option :value="pinSelect">GPIO {{pinSelect}}</option>
                            </template>
                        </template>
                    </select>
                </span>
            </label>
            <label>
                <span class="new-item__label">Belongs to device</span>
                <span class="new-item__field">
                    <select v-model="pin.device_id">
                        <option value="0">select ...</option>
                        <template v-for="device in devices">
                            <template v-if="device.id === pin.device_id">
                               <option :value="device.id" selected="selected">{{device.name}}</option>
                            </template>
                            <template v-else>
                                <option :value="device.id">{{device.name}}</option>
                            </template>
                        </template>
                    </select>
                </span>
            </label>
            <div class="new-item__actions">
                <span class="new-item__label">
                    <router-link class="new-item__cancel" :to="`/pins/`">cancel</router-link>
                </span>
                <span class="new-item__label">
                    <button v-on:click="savePin(pin.id)" class="new-item__save" type="submit">save</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {
                availablePins: [2, 3, 4, 5, 6, 14, 15, 16, 17, 18, 23, 22, 24, 25, 26, 27],
                devices: [],
                pin: []
            };
        },
        created() {
            this.fetchPin(this.$route.params.id);
            this.fetchDevices();
        },
        methods: {
            savePin(id) {
                let self = this;
                self.$Progress.start()

                fetch(`/api/pins/${id}`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.pin)
                })
                    .then((resp) => {
                        if (resp.status == 200) {
                            self.$router.push('/pins')
                            self.$Progress.finish()
                        } else {
                            alert('Failed to delete item')
                        }
                    })
            },
            fetchDevices: function () {
                let self = this;

                fetch('/api/devices/')
                    .then((resp) => resp.json())
                    .then(function (data) {
                        self.devices = data
                        self.$Progress.finish()
                    })
            },
            fetchPin: function (id) {
                let self = this;

                fetch(`/api/pins/${id}`)
                    .then((resp) => resp.json())
                    .then(function (data) {
                        self.pin = data
                        self.$Progress.finish()
                    })
            }
        }
    }
</script>