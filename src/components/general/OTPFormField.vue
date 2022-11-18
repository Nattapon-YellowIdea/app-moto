<template>
    <div class="ma-auto position-relative" style="max-width: 300px">
        <div class="d-flex justify-center align-center mb-3">
            <span>OTP Ref: {{OTPref}}</span>
        </div>
        <v-otp-input
            :color="color"
            :disabled="disabled"
            @finish="onFinish"
            @input="onChange"
            ref="otpField"
        ></v-otp-input>
        <div class="d-flex justify-center align-center mb-3" v-if="otp_error">
            <span class="text-danger">กรุณากรอกรหัส OTP</span>
        </div>
        <div class="d-flex justify-center align-center mb-3" @click="resendHandler">
            <v-icon color="#003294" >mdi-refresh</v-icon>
            <span>ขอรหัส OTP ใหม่</span>
        </div>
    </div>
</template>

<script>

export default {
    name : "otp-input",
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
            default: false
        },
        errorMessage: {
            type: String,
            required: false,
        },
        OTPref: {
            type: String,
            required: false,
            default: ''
        }
    },
    data() {
        return {
            otp_error: false
        }
    },
    mounted() {

    },
    computed: {
       color() {
           if(this.otp_error){
               return 'error'
           }
           else {
               return 'primary'
           }
       }
    },
    methods: {
        onFinish(value) {
            this.$emit('onFinish', value)
        },
        onChange(value){
            this.otp_error = false
            this.$emit('input', value)
        },
        resendHandler(e){
            this.$emit('onResend')
        },
        setError(){
            this.otp_error = true
            this.$refs.otpField.focus()
        }
    },
}
</script>

<style scoped>
.position-relative {
    position: relative;
    
}

</style>