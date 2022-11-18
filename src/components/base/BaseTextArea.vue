<template>
    <div>
        <textarea
            v-bind="$attrs"
            rows="4"
            :class="classes"
            :placeholder="placeholder"
            @input="onInput"
            @keypress="onKeypress"
        />
        <span class="message-error" v-if="error">{{errorMessage}}</span>
    </div>
</template>

<script>
export default {
    name: 'base-input',
    props: {
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
        }
    },
    computed: {
        classes() {
            return {
                'input': true,
                'input-error': this.error,
            };
        },
    },
    methods: {
        onInput(event) {
            this.$emit('input', event.target.value)
        },
        onKeypress(event) {
            this.$emit('onKeypress', event)
        }
    },
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid #222222;
    background-color: #ffffff;
    border-radius: 24px;
    font-family: NT;
    font-weight: 400;
    font-size: 18px;
    color: #2E2E2E;
    padding: 12px 16px;
    resize: none;
}
.input:focus {
    outline: none;
}
.input.input-error {
    border: 1px solid #F62B2F;
}
.input::placeholder {
    color: #BBBBBB;
}
.input:disabled {
    border-color: #BBBBBB;
    background-color: #BBBBBB;
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