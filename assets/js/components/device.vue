<template>
    <ul>
        <li v-for="device in devices">
            {{ device.name }}
        </li>
    </ul>
</template>

<script charset="utf-8">
    export default {
        props: ['devices'],
        data() {
            return {};
        },
    };
</script>