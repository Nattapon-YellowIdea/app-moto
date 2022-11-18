<template>
<div>
    <input
        v-bind="$attrs"
        :type="type"
        :class="classes"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        ref="inputbox"
        @input="onInput"
        @keypress="onKeypress"
    >
    <div class="input-detail">
        <div class="message-error" v-if="error">
            {{errorMessage}}
        </div>
        <span
            v-if="counter"
            class="counter-number"
        >{{value.length}}/{{counter}}</span>
    </div>
</div>
</template>

<script>
export default {
    name: 'base-input',
    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        placeholder: {
            type: String,
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
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        value: {
            type: String,
            required: false,
        },
        counter: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
    },
    computed: {
        classes() {
            return {
                'input': true,
                'input-error': this.error,
            };
        },
    },
    mounted() {
        const inputBox = this.$refs.inputbox
        inputBox.onpaste = e => e.preventDefault();
    },
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value)
        },
        onKeypress(event) {
            this.$emit('onKeypress', event)
        },
    },
}
</script>

<style scoped>
.input {
    width: 100%;
    height: 44px;
    border: 1px solid #222222;
    background-color: #ffffff;
    border-radius: 24px;
    font-family: NT;
    font-weight: 400;
    font-size: 18px;
    color: #2E2E2E;
    padding: 0 24px;
    line-height: 44px;
    text-indent: 1px;
}
.input:focus {
    outline: none;
}
.input.input-error {
    border: 1px solid #F62B2F;
}
.input::placeholder {
    color: #BBBBBB;
    line-height: 44px;
    text-indent: 1px;
}
.input:disabled {
    border-color: #545859;
    background-color: #F0F0F0;
}
.message-error {
    color: #F72B2F;
    font-family: NT;
    font-weight: 400;
    font-size: 16px !important;
    display: block;
    margin-top: 4px;
}
.counter-number {
    font-weight: 400;
    font-size: 12px !important;
    float: right;
    color: #9EA0A5;
}
</style>