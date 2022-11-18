<template>
    <v-checkbox
        :label="label"
        :value="value"
        color="primary"
        class="checkbox"
        hide-details
    ></v-checkbox>
</template>

<script>
export default {
    name: 'base-checkbox',
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: false,
        },
    }
}
</script>

<style scoped>
.checkbox {
    margin-top: 0;
    padding-top: 0;
}
.checkbox /deep/.v-input__control .v-input__slot .v-input--selection-controls__input {
    margin-top: 2px;
}
.checkbox /deep/.v-input__control .v-input__slot .v-label {
    font-family: NT;
    font-weight: 400;
    font-size: 16px !important;
    line-height: 1.6;
}
.checkbox /deep/.v-input__control .v-input__slot {
    align-items: start;
}
.checkbox /deep/.v-input__control .v-input__slot .v-input--selection-controls__input:hover .v-input--selection-controls__ripple:before {
    background: transparent !important;
}
</style>