<template>
    <div>
        <app-header :title="`New group`"></app-header>

        <div class="new-item">
            <label>
                <span class="new-item__label">Name</span>
                <span class="new-item__field">
                    <input type="text" v-model="group.name">
                </span>
            </label>
            <label>
                <span class="new-item__label">Description</span>
                <span class="new-item__field">
                    <input type="text" v-model="group.description">
                </span>
            </label>
            <div class="new-item__actions">
                <span class="new-item__label">
                    <router-link class="new-item__cancel" :to="`/groups/`">cancel</router-link>
                </span>
                <span class="new-item__label">
                    <button v-on:click="createGroup()" class="new-item__save" type="submit">save</button>
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
                group: {
                    name: '',
                    description: '',
                }
            };
        },
        created() {},
        methods: {
            createGroup() {
                let self = this;
                self.$Progress.start()

                fetch(`/api/groups/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.group)
                })
                    .then((resp) => {
                        if (resp.status == 201) {
                            self.$router.push('/groups')
                            self.$Progress.finish()
                        } else {
                            alert('Failed to create item')
                        }
                    })
            },
        }
    }
</script>