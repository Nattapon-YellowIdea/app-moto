<template>
    <button
        :style="{'background-color': backgroundColor, 'border-color': borderColor, 'color': color}"
        :class="classes"
        :disabled="disabled"
        @click="onClick"
    >
        {{ label }}
    </button>
</template>

<script>
export default {
    name: 'base-button',
    props: {
        label: {
            type: String,
            required: true,
        },
        backgroundColor: {
            type: String,
            default: '#FFD100',
        },
        borderColor: {
            type: String,
            default: '#FFD100',
        },
        color: {
            type: String,
            default: '#000',
        },
        outline: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        shadow: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            return {
                'button': true,
                'button-outline': this.outline,
                'button-shadow': this.shadow,
            };
        },
    },
    methods: {
        onClick() {
            this.$emit('onClick');
        },
    },
}
</script>

<style scoped>
.button {
    font-weight: 700;
    font-size: 18px !important;
    border: 2px solid #FFD100;
    border-radius: 25px;
    color: #222222;
    background-color: #FFD100;
    height: 44px !important;
    min-height: 44px !important;
    padding: 0 14px !important;
    letter-spacing: 0;
    text-indent: 0;
    text-transform: none;
    flex: 1;
}
.button:focus {
    box-shadow: none;
    outline: none
}
.button:disabled {
    background-color: #CCD0D1 !important;
    border: 2px solid #CCD0D1 !important;
    color: #ffffff !important;
}
.button-outline {
    border: 2px solid #FFD100 !important;
    background-color: #ffffff !important;
    color: #222222 !important;
}
.button.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
    background-color: #CCD0D1 !important;
    border: 2px solid #CCD0D1 !important;
    color: #ffffff !important;
}
.button.button-shadow {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
}
</style>
