<template>
    <div class="header">
        <app-offcanvas></app-offcanvas>
        <span ref="appTitle" id="page__title">{{ title }}</span>

        <div v-if="link">
            <router-link class="list__new" :to="`${link}`"></router-link>
        </div>
        <div v-else>
            <img class="header__icon" src="/assets/images/logo.svg"/>
        </div>
    </div>
</template>

<script charset="utf-8">
    export default {
        props: ['title', 'link'],
        data() {
            return {}
        },
    };
</script>