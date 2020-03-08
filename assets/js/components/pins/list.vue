<template>
    <div>
        <app-header :title="`Pins`" link="/pins/new"></app-header>

        <div class="list">
            <div class="list__item--head">
                <div class="list__item__name">Name</div>
                <div class="list__item__number">Pin</div>
                <div class="list__item__action">Actions</div>
            </div>
            <div class="list__item" v-for="(pin, index) in pins">
                <div class="list__item__name">{{pin.name}}</div>
                <div class="list__item__number">{{pin.pin_number}}</div>
                <div class="list__item__action">
                    <router-link class="list__item__edit" :to="`/pins/${pin.id}/edit`">e</router-link>
                    <span v-on:click="deletePin(pin.id)" class="list__item__delete">d</span>
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
                pins: []
            };
        },
        created() {
            this.fetchData();
        },
        methods: {
            deletePin(id) {
                let self = this;
                self.$Progress.start()

                fetch(`/api/pins/${id}`, {
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

                fetch('/api/pins/')
                    .then((resp) => resp.json())
                    .then(function(data) {
                        self.pins = data
                        self.$Progress.finish()
                    })
            }
        }
    }
</script>