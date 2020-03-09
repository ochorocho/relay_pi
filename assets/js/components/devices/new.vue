<template>
    <div>
        <app-header :title="`New device`"></app-header>

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
                        <option value="0">select ...</option>
                        <option :value="type" v-for="type in availableTypes">{{type}}</option>
                    </select>
                </span>
            </label>
            <label>
                <span class="new-item__label">Belongs to group</span>
                <span class="new-item__field">
                    <select v-model="device.group_id">
                        <option value="0">select ...</option>
                        <option :value="group.id" v-for="group in groups">{{group.name}}</option>
                    </select>
                </span>
            </label>
            <div class="new-item__actions">
                <span class="new-item__label">
                    <router-link class="new-item__cancel" :to="`/devices/`">cancel</router-link>
                </span>
                <span class="new-item__label">
                    <button v-on:click="createDevice()" class="new-item__save" type="submit">save</button>
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
            this.fetchGroups();
        },
        methods: {
            createDevice() {
                let self = this;
                self.$Progress.start()

                fetch(`/api/devices/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.device)
                })
                    .then((resp) => {
                        if (resp.status == 201) {
                            self.$router.push('/devices')
                            self.$Progress.finish()
                        } else {
                            alert('Failed to create item')
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
        }
    }
</script>