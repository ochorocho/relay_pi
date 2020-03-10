<template>
    <div>
        <app-header :title="`Groups`" link="/groups/new"></app-header>

        <div class="list">
            <div class="list__item--head">
                <div class="list__item__name">Name</div>
                <div class="list__item__number">Description</div>
                <div class="list__item__action">Actions</div>
            </div>
            <div class="list__item" v-for="(group, index) in groups">
                <div class="list__item__name">{{group.name}}</div>
                <div class="list__item__number">{{group.description}}</div>
                <div class="list__item__action">
                    <router-link class="list__item__edit" :to="`/groups/${group.id}/edit`"></router-link>
                    <span v-on:click="deleteGroup(group.id)" class="list__item__delete"></span>
                </div>
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
                groups: []
            };
        },
        created() {
            this.fetchData();
        },
        methods: {
            deleteGroup(id) {
                let self = this;
                self.$Progress.start()

                fetch(`/api/groups/${id}`, {
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

                fetch('/api/groups/')
                    .then((resp) => resp.json())
                    .then(function(data) {
                        console.log(data)
                        self.groups = data
                        self.$Progress.finish()
                    })
            }
        }

    };
</script>