<template>
    <Slide ref="offCanvas">
        <router-link @click.native="hideOffCanvas" class="offcanvas__item" :to='{name: "dashboard"}'>
            <span>Dashboard</span>
        </router-link>
        <router-link @click.native="hideOffCanvas" class="offcanvas__item" :to='{name: "listGroup"}'>
            <span>Groups</span>
        </router-link>
        <router-link @click.native="hideOffCanvas" class="offcanvas__item" :to='{name: "listDevice"}'>
            <span>Devices</span>
        </router-link>
        <router-link @click.native="hideOffCanvas" class="offcanvas__item" :to='{name: "listPin"}'>
            <span>Pins</span>
        </router-link>
    </Slide>
</template>

<script charset="utf-8">
    import {Slide} from 'vue-burger-menu'

    export default {
        components: {
            Slide
        },
        methods: {
            hideOffCanvas() {
                document.body.classList.remove('bm-overlay')
                if(this.$refs.offCanvas) {
                    this.$refs.offCanvas.$el.querySelector('.bm-menu').style.width = 0
                }
            }
        }
    }
</script>
