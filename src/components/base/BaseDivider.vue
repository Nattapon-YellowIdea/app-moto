<template>
    <div :class="classes" :style="`border-color: ${color}`"></div>
</template>

<script>
export default {
    name: 'base-divider',
    props: {
        type: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: false,
            default: '#CCD0D1'
        }
    },
    computed: {
        classes() {
            return {
                [`divider-${this.type}`]: true,
            };
        },
    },
}
</script>

<style scoped>
.divider-solid {
    height: 1px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
}
.divider-dashed {
    height: 1px;
    border-bottom-width: 1px;
    border-bottom-style: dashed;
}
</style>