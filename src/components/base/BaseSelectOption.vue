<template>
    <div>
        <v-select
            :items="options"
            :label="placeholder"
            :flat="true"
            :class="classes"
            :value="value"
            :disabled="disabled"
            hide-details
            solo
            no-data-text="ไม่พบข้อมูล"
            @input="onInput"
        >
            <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
                <slot :name="name" v-bind="slotData" />
            </template>
        </v-select>
        <span class="message-error" v-if="error && errorMessage">{{errorMessage}}</span>
    </div>
</template>

<script>
export default {
    name: 'base-select-option',
    props: {
        options: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            required: true
        },
        center: {
            type: Boolean,
            required: false
        },
        value: {
            type: String/Number,
            required: false,
        },
        error: {
            type: Boolean,
            required: false,
        },
        errorMessage: {
            type: String,
            required: false,
        },
        disabled: {
            type: Boolean,
            required: false,
        },
    },
    computed: {
        classes() {
            return {
                'select': true,
                'select-center': this.center,
                'select-error': this.error,
            };
        },
    },
    methods: {
        onInput(value) {
            this.$emit('input', value)
        }
    },
}
</script>

<style scoped>
.select {
    width: 100%;
    height: 44px;
    border: 1px solid #545859;
    background-color: #FFF;
    border-radius: 24px !important;
    font-family: NT;
    font-weight: 400;
    font-size: 16px;
    /* padding: 0 16px; */
    color: #000;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: url(../../assets/icons/arrow-down.svg) no-repeat right 20px center white;
    line-height: 44px;
    text-indent: 1px;
}
.select:required:invalid {
    color: gray;
}
.select:focus {
    outline: none;
}
.select option[value=""][disabled] {
    display: none;
}
.select option {
    color: #000000;
}
.select /deep/.v-input__control  {
    height: 44px;
    min-height: 44px !important;
}
.select /deep/.v-input__control .v-input__slot {
    margin-bottom: 0px;
    background-color: transparent !important;
    padding: 0 24px !important;
}
.select /deep/.v-input__control .v-input__slot .v-select__slot {
    height: 44px;
}
.select.select-center /deep/.v-input__control .v-input__slot .v-select__slot {
    justify-content: center;
}
.select /deep/.v-input__control .v-input__slot .v-select__slot .v-label {
    height: 44px;
    line-height: 44px;
    top: 0;
    left: auto !important;
    color: #BBBBBB;
}
.select /deep/.v-input__control .v-input__slot .v-select__slot .v-input__append-inner {
    display: none;
}
.select /deep/.v-input__control .v-input__slot .v-select__slot .v-select__selections {
    height: 44px;
}
.select /deep/.v-input__control .v-input__slot .v-select__slot .v-select__selections .v-select__selection {
    height: 44px;
    margin: 0;
    line-height: 40px;
    width: 100%;
    max-width: 100%;
}
.select.select-center /deep/.v-input__control .v-input__slot .v-select__slot .v-select__selections .v-select__selection {
    text-align: center;
}
.select.select-error {
    border: 1px solid #FF3535;
}
.select.theme--light.v-input--is-disabled {
    border-color: #CCD0D1;
    background-color: #CCD0D1;
}
.select.select-center /deep/.v-input__control .v-input__slot .v-select__slot .v-select__selections .v-select__selection.v-select__selection--disabled {
    color: #2E2E2E;
}
.message-error {
    color: #F72B2F;
    font-family: NT;
    font-weight: 400;
    font-size: 16px !important;
    display: block;
    margin-top: 4px;
}
</style>