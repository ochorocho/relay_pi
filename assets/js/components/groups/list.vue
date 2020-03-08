<template>
    <div>
        <app-header :title="`Groups`" link="/groups/new"></app-header>

        <div class="list">
            <div class="list__item--head">
                <div class="list__item__name">Name</div>
                <div class="list__item__number">Devices</div>
                <div class="list__item__action">Actions</div>
            </div>
            <div class="list__item" v-for="(group, index) in groups">
                <div class="list__item__name">{{group.name}}</div>
                <div class="list__item__number">
                    <div v-for="device in group.devices">
                        {{device.name}}
                    </div>
                </div>
                <div class="list__item__action">
                    <span class="list__item__edit"></span>
                    <span class="list__item__delete"></span>
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
            fetchData: function() {
                let self = this;

                fetch('/api/rooms/')
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