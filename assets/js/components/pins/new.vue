<template>
    <div>
        <app-header :title="`New pin`"></app-header>

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
                        <option value="0">select ...</option>
                        <option :value="pin" v-for="pin in availablePins">GPIO {{pin}}</option>
                    </select>
                </span>
            </label>
            <label>
                <span class="new-item__label">Belongs to device</span>
                <span class="new-item__field">
                    <select v-model="pin.device_id">
                        <option value="0">select ...</option>
                        <option :value="device.id" v-for="device in devices">{{device.name}}</option>
                    </select>
                </span>
            </label>
            <div class="new-item__actions">
                <span class="new-item__label">
                    <router-link class="new-item__cancel" :to="`/pins/`">cancel</router-link>
                </span>
                <span class="new-item__label">
                    <button v-on:click="createPin()" class="new-item__save" type="submit">save</button>
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
                availablePins: [2,3,4,5,6,14,15,16,17,18,23,22,24,25,26,27],
                devices: [],
                pin: {
                    name: '',
                    pin_number: '',
                    device_id: '',
                }
            };
        },
        created() {
            this.fetchDevices();
        },
        methods: {
            createPin() {
                let self = this;
                self.$Progress.start()

                fetch(`/api/pins/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.pin)
                })
                    .then((resp) => {
                        console.log(resp)
                        if (resp.status == 200) {
                            self.$router.push('/pins')
                            self.$Progress.finish()
                        } else {
                            alert('Failed to create item')
                        }
                    })
            },
            fetchDevices: function() {
                let self = this;

                fetch('/api/devices/')
                    .then((resp) => resp.json())
                    .then(function(data) {
                        self.devices = data
                        self.$Progress.finish()
                    })
            },
        }
    }
</script>