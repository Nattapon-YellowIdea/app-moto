<template>
    <v-app>
        <router-view />
        <!-- <TermAndCondition /> -->
    </v-app>
</template>

<script>
// import TermAndCondition from './components/general/TermAndCondition';

export default {
    async mounted() {
        let path = $cookies.get('LINE_LIFF_ORIGIN_PATH_NT');
        if (path !== undefined && path !== null && path !== 'undefined' && path !== 'null') {
            console.log('App', path);
            
            this.$router.push(path);
            $cookies.remove('LINE_LIFF_ORIGIN_PATH_NT');
        }
    },
    methods: {},
    // components: { TermAndCondition },
};
</script>

