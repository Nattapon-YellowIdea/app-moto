<template>
    <v-dialog
        :width="width"
        :value="visible"
        :persistent="true"
        overlay-opacity="0.8"
    >
        <slot />
    </v-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true,
            default: false
        },
        width: {
            type: String,
            required: false,
            default: '600'
        },
    },
    methods: {
        onSubmit() {
            this.$emit('onSubmit')
        }
    },
}
</script>