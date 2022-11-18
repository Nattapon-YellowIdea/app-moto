<template>
    <div :class="classes" @click="onClick">
        <div class="card-header">
            <slot name="header"></slot>
        </div>
        <div class="card-body">
            <slot name="body"></slot>
        </div>
        <div class="card-footer">
            <slot name="footer"></slot>
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'base-card',
    props: {
        shadow: {
            type: Boolean,
            required: false,
        },
        border: {
            type: Boolean,
            required: false,
        },
        cardFull: {
            type: Boolean,
            required: false,
        },
        active: {
            type: Boolean,
            required: false,
        },
        hidePadding: {
            type: Boolean,
            required: false,
        },
    },
    computed: {
        classes() {
            return {
                'card-wrap': true,
                'card-shadow': this.shadow,
                'card-border': this.border,
                'card-full': this.cardFull,
                'card-active': this.active,
                'card-no-padding': this.hidePadding,
            };
        },
    },
    methods: {
        onClick() {
            this.$emit('onClick');
        }
    },
}
</script>

<style scoped>
.card-wrap {
    padding: 24px 0;
    background-color: #ffffff;
    border-radius: 8px;
    font-family: NT;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
}
.card-header {
    position: relative;
}
.card-no-padding {
    padding: 0px !important;
}
.card-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.card-border {
    border: 1px solid #CCD0D1;
}
.card-body {
    flex: 1;
}
.card-full {
    min-height: calc(100vh);
}
.card-active {
    background-color: rgba(96, 177, 129, 0.5);
    border: 1px solid rgba(96, 177, 129, 0.5);
}
</style>