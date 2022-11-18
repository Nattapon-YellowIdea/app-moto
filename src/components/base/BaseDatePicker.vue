<template>
<div>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on }">
            <v-text-field
                :value="computedDateFormattedMomentjs"
                :placeholder="placeholder"
                v-on="on"
                readonly
                single-line
                outlined
                hide-details
                dense
                append-icon="mdi-calendar-blank-outline"
                :disabled="readOnly"
                :class="classes"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="date"
            @input="dataEscolhida"
            ref="form-base-date_picker"
            no-title
            header-color="#FFD100"
            color="#FFD100"
            locale="th-th"
            :min="min"
            :max="max"
        ></v-date-picker>
    </v-menu>
    <span
        class="message-error"
        v-if="error && errorMessage"
    >{{errorMessage}}</span>
</div>
</template>

<script>
import moment from 'moment'

export default {
    props: ['placeholder', 'value', 'error', 'errorMessage', 'readOnly', 'min', 'max', 'required', 'formDirty', 'disableDelete', 'name'],
    data() {
        return {
            menu: false,
            date: null
        }
    },
    mounted() {
        if(this.value) {
            this.date = moment(this.value).format('YYYY-MM-DD')
        }
    },
    computed: {
        computedDateFormattedMomentjs () {
            return this.value ? moment(this.value).format('DD/MM/YYYY') : ''
        },
        classes() {
            return {
                'input-group': true,
                'input-group-error': this.error,
            };
        },
    },
    methods: {
        formatDate(date) {
            const year = date.substring(0, 4)
            const month = date.substring(5, 7)
            const day = date.substring(8, 11)
            const hour = '00'
            const minute = '00'
            const second = '00'

            return year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + '.000' + 'Z'
        },
        dataEscolhida() {
            this.$emit('input', this.formatDate(this.date));
            this.menu = false;
        },
        handleInput(e) {
            if ( this.disableDelete && (e.key === "Backspace" || e.key === "Delete")) {
                return e.preventDefault(); // Don't do anything to the input
            }
        },
    },
}
</script>

<style scoped>
.message-error {
    color: #F72B2F;
    font-family: NT;
    font-weight: 400;
    font-size: 16px !important;
    display: block;
    margin-top: 4px;
}
</style>