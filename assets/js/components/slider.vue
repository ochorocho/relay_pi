<template>
    <vue-slider ref="slider"
                v-on:dragging="dimmerStart()"
                v-on:drag-end="dimmerStop()"
                tooltip="none"
                :value="value"
                :min="-50"
                :max="50"
                dotSize="24"/>
</template>

<script>
    import VueSlider from 'vue-slider-component'

    export default {
        components: {
            VueSlider
        },
        data () {
            return {
                value: 0
            }
        },
        methods: {
            dimmerStart() {
                let value = this.$refs.slider.getValue()
                if(value == 10) {
                    this.$log('Dimm Up ' + this.$refs.slider.getValue())
                } else if(value == 0) {
                    this.$log('Dimm STOP! ' + this.$refs.slider.getValue())
                } else if(value == -10) {
                    this.$log('Dimm down ' + this.$refs.slider.getValue())
                }
            },
            dimmerStop() {
                this.$refs.slider.setValue(0)
                this.$log('Dimm OFF ' + this.$refs.slider.getValue())
            }
        }
    }
</script>

<style scoped>

</style>