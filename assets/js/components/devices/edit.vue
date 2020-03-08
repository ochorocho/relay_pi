<template>
    <div>
        <app-header :title="`Edit pin`"></app-header>

        <div class="new-item">
            <label>
                <span class="new-item__label">Name</span>
                <span class="new-item__field">
                    <input type="text" v-model="device.name">
                </span>
            </label>
            <label>
                <span class="new-item__label">Type</span>
                <span class="new-item__field">
                    <select v-model="device.type">
                        <option value="0">select ... </option>
                        <template v-for="type in availableTypes">
                            <template v-if="type === device.type">
                               <option :value="type" selected="selected">{{type}}</option>
                            </template>
                            <template v-else>
                                <option :value="type">{{type}}</option>
                            </template>
                        </template>
                    </select>
                </span>
            </label>
            <label>
                <span class="new-item__label">Belongs to group</span>
                <span class="new-item__field">
                    <select v-model="device.room_id">
                        <option value="0">select ...</option>
                        <template v-for="group in groups">
                            <template v-if="group.id === group.room_id">
                               <option :value="device.id" selected="selected">{{group.name}}</option>
                            </template>
                            <template v-else>
                                <option :value="group.id">{{group.name}}</option>
                            </template>
                        </template>
                    </select>
                </span>
            </label>
            <div class="new-item__actions">
                <span class="new-item__label">
                    <router-link class="new-item__cancel" :to="`/devices/`">cancel</router-link>
                </span>
                <span class="new-item__label">
                    <button v-on:click="saveDevice(device.id)" class="new-item__save" type="submit">save</button>
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
                availableTypes: ['dimmer', 'switch', 'shutter'],
                groups: [],
                device: {
                    name: '',
                    type: '',
                    room_id: '',
                }
            };
        },
        created() {
            this.fetchDevice(this.$route.params.id);
            this.fetchGroups();
        },
        methods: {
            saveDevice(id) {
                let self = this;
                self.$Progress.start()

                console.log(JSON.stringify(this.device))
                fetch(`/api/devices/${id}`, {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.device)
                })
                    .then((resp) => {
                        console.log(resp)

                        if (resp.status == 200) {
                            self.$router.push('/devices')
                            self.$Progress.finish()
                        } else {
                            alert('Failed to delete item')
                        }
                    })
            },
            fetchGroups: function() {
                let self = this;

                fetch('/api/rooms/')
                    .then((resp) => resp.json())
                    .then(function(data) {
                        self.groups = data
                        self.$Progress.finish()
                    })
            },
            fetchDevice: function (id) {
                let self = this;

                fetch(`/api/devices/${id}`)
                    .then((resp) => resp.json())
                    .then(function (data) {
                        self.device = data
                        self.$Progress.finish()
                    })
            }
        }
    }
</script>