<template>
    <Modal :visible="termConditionModal">
        <v-card>
            <v-card-title>
                <div class="term-condition-title">ข้อตกลงและเงื่อนไขการให้บริการ</div>
            </v-card-title>
            <v-divider></v-divider>
            <div class="term-condition">
                <div class="detail">
                    {{ termAndCondition_text }}
                </div>
                <v-divider></v-divider>
                <div class="py-1 px-4 d-flex">
                    <v-spacer></v-spacer>
                    <v-btn class="ma-2 white--text" color="#1867c0" @click="onAcceptTermAndCondition"> ยอมรับ </v-btn>
                </div>
            </div>
        </v-card>
    </Modal>
</template>

<script>
import { Buffer } from 'buffer';

export default {
    data() {
        const userProfile = $cookies.get('LINE_LIFF_DATA');
        const userProfileData = $cookies.get('USER_PROFILE');
        return {
            termAndCondition_text: '',
            termAndCondition_version: null,
            userProfileData,
            userProfile,
            termConditionModal: false,
        };
    },
    async mounted() {
        if (
            window.location.pathname !== '/ntplc/login/email' &&
            window.location.pathname !== '/ntplc/login/phone-number' &&
            window.location.pathname !== '/ntplc/register' &&
            window.location.pathname !== '/register/broadband/form' &&
            window.location.pathname !== '/register/broadband/lead-form' &&
            window.location.pathname !== '/register/fixed-line/lead-form' &&
            window.location.pathname !== '/register/broadband/user-check'
        ) {
            await getTermAndCondition({
                formData: {},
                cbSuccess: (res) => {
                    let resData = res.data.data;
                    if (
                        this.userProfileData.is_consent === 'false' ||
                        this.userProfileData.consent_version < resData.version ||
                        !this.userProfileData.is_consent
                    ) {
                        this.termConditionModal = true;
                        this.termAndCondition_text = resData.detail;
                        this.termAndCondition_version = resData.version;
                    }
                },
                cbError: (e, msg) => {},
            });
        }
    },
    methods: {
        async onAcceptTermAndCondition() {
            let formData = {};
            if (this.userProfileData === 'null') {
                formData = {
                    line_user_id: this.userProfile.userId,
                    tier: 1,
                    socialid: '',
                    displayname: this.userProfile.displayName,
                    mobile: '',
                    email: this.userProfile.email,
                    idnumbertype: '',
                    idnumber: '',
                    is_activate: false,
                    is_consent: 'true',
                    consent_version: this.termAndCondition_version,
                };
            } else {
                formData = {
                    line_user_id: this.userProfile.userId,
                    consent_version: this.termAndCondition_version,
                };
            }

            await updateTermAndCondition({
                formData: formData,
                cbSuccess: (res) => {
                    this.termConditionModal = false;
                },
                cbError: (e, msg) => {
                    this.$toast.error('ระบบขัดข้อง');
                },
            });
        },
        doubleBase64Decrypt(base64Str) {
            if (base64Str === '' || !base64Str) return '';
            const base64 = Buffer.from(base64Str, 'base64').toString();
            const text = Buffer.from(base64, 'base64').toString();
            return text;
        },
    },
};
</script>

<style></style>
