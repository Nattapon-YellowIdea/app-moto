<template>
    <loading v-if="!display" color="#FFD100" />
    <layout v-else>
        <loading v-if="loading" color="#FFD100" :class="btnLoading === true ? 'loadingBackground' : ''" />
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">สมัครบริการ<br />NT BROADBAND</div>
            </template>
            <template v-slot:body>
                <div class="py-6 px-4">
                    <div class="font-weight-5 font-size-4 mb-2">กรอกข้อมูลเพื่อทำการสมัคร</div>
                    <div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <div class="form-group">
                                    <v-radio-group v-model="formData.type" row hide-details class="mb-2">
                                        <v-radio label="หมายเลขบัตรประชาชน" value="cid"></v-radio>
                                        <v-radio label="หนังสือเดินทาง" value="passport"></v-radio>
                                    </v-radio-group>
                                    <base-input
                                        v-if="formData.type === 'cid'"
                                        v-model="formData.cid"
                                        type="tel"
                                        maxlength="13"
                                        placeholder="กรอกหมายเลขบัตรประชาชน"
                                        :error="(formDirty && !formData.cid) || (formDirty && cid_invalid)"
                                        :errorMessage="
                                            cid_invalid ? 'เลขประจำตัวประชาชนไม่ถูกต้อง' : 'กรุณากรอกหมายเลขบัตรประชาชน'
                                        "
                                        @onKeypress="onNumberInput"
                                    />
                                    <base-input
                                        v-else
                                        v-model="formData.passport"
                                        placeholder="กรอกหมายเลขหนังสือเดินทาง"
                                        :error="formDirty && !formData.passport"
                                        errorMessage="กรุณากรอกหมายเลขหนังสือเดินทาง"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <vue-recaptcha :sitekey="captcha_site_key" ref="recaptcha" @verify="verifyCaptcha" />
                                <div class="message-error" v-if="formDirty && captchaValid == false">
                                    Captcha validation is required!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="d-flex justify-center align-center pa-6">
                    <base-button
                        :label="btnLoading === true ? 'กำลังโหลด...' : 'ยืนยัน'"
                        :disabled="btnLoading === true ? true : false"
                        @onClick="onSubmit"
                        shadow
                    />
                </div>
            </template>
        </base-card>
    </layout>
</template>

<script>
import { checkBackList, getDetailRegisterService } from '@/apis/register-service';
import { VueRecaptcha } from 'vue-recaptcha';
import { checkEmojiAndSpecialChar } from '@/utility/helper';

export default {
    components: { VueRecaptcha },
    data() {
        const userProfile = $cookies.get('LINE_LIFF_DATA');
        return {
            conditionTab: 0,
            display: false,
            loading: true,
            formDirty: false,
            btnLoading: false,
            cid_invalid: false,
            transaction_id: null,
            captcha_site_key: process.env.VUE_APP_RE_CAPTCHA_SITE_KEY,
            captchaValid: false,
            captchaValue: '',
            userProfile,
            formData: {
                type: 'cid',
                cid: '',
                passport: '',
                line_user_id: userProfile.userId,
            },
        };
    },
    watch: {
        'formData.cid'(val) {
            this.formData.cid = checkEmojiAndSpecialChar(val);
        },
        'formData.passport'(val) {
            this.formData.passport = checkEmojiAndSpecialChar(val);
        },
    },
    mounted() {
        document.title = 'สมัครบริการ NT BROADBAND';

        gtag('config', process.env.VUE_APP_GTAG_CONFIG, {
            page_title: 'เช็ค Blacklist',
        });

        this.transaction_id = this.$router.history.current.query.id;

        if (this.$router.history.current.query.id) {
            this.onLoad(this.$router.history.current.query.id);
        }
    },
    methods: {
        async onLoad(id) {
            await getDetailRegisterService({
                formData: {
                    id: id,
                },
                cbSuccess: (res) => {
                    const resData = res.data.data;
                    if (resData.order_status_code !== '') {
                        this.$router.push('/register/broadband/already');
                        return;
                    }
                    this.display = true;
                    this.loading = false;
                },
                cbError: (e, msg) => {
                    this.$toast.error('ระบบขัดข้อง');
                    this.loading = false;
                },
            });
        },
        onNumberInput(event) {
            const key = window.event ? event.keyCode : event.which;
            if (event.keyCode === 8 || event.keyCode === 46) {
                return true;
            } else if (key < 48 || key > 57) {
                event.preventDefault();
            } else {
                return true;
            }
        },
        checkCId(cid) {
            if (cid.charAt(0) === '6' || cid.charAt(0) === '0') {
                return true;
            }

            var total = 0;
            var iPID;
            var chk;
            var Validchk;
            iPID = cid.replace(/-/g, '');
            Validchk = iPID.substr(12, 1);
            var j = 0;
            var pidcut;
            for (var n = 0; n < 12; n++) {
                pidcut = parseInt(iPID.substr(j, 1));
                total = total + pidcut * (13 - n);
                j++;
            }

            chk = 11 - (total % 11);

            if (chk == 10) {
                chk = 0;
            } else if (chk == 11) {
                chk = 1;
            }
            if (chk == Validchk) {
                return true;
            } else {
                return false;
            }
        },
        async onSubmit() {
            this.formDirty = true;
            if (
                (this.formData.type === 'cid' && !this.formData.cid) ||
                (this.formData.type === 'passport' && !this.formData.passport) ||
                this.captchaValid === false
            ) {
                this.loading = false;
                this.$toast.warning('โปรดกรอกข้อมูลให้ครบถ้วน');
                return;
            } else if (this.formData.type === 'cid' && (!this.checkCId(this.formData.cid) || this.formData.cid.length !== 13)) {
                this.cid_invalid = true;
                this.loading = false;
                this.$toast.warning('โปรดกรอกหมายเลขบัตรประชาชนให้ถูกต้อง');
                return;
            } else {
                this.btnLoading = true;
                this.loading = true;
                if (this.formData.type === 'cid') {
                    this.formData.passport = '';
                } else {
                    this.formData.cid = '';
                }

                await checkBackList({
                    formData: this.formData,
                    cbSuccess: (res) => {
                        if (res.data.data.ca_blacklist === 'Yes') {
                            this.$router.push(`/register/broadband/error`);
                            return;
                        }

                        this.$cookies.set(
                            'REGISTER_DATA',
                            JSON.stringify({
                                personalId: this.formData.type === 'cid' ? this.formData.cid : this.formData.passport,
                                ...res.data.data,
                            })
                        );
                        this.$router.push(`/register/broadband/form?id=${this.transaction_id}`);

                        this.btnLoading = false;
                        this.loading = false;
                    },
                    cbError: (e, msg) => {
                        this.btnLoading = false;
                        this.loading = false;
                        this.$toast.error('ระบบขัดข้อง');
                    },
                });
            }
        },
        verifyCaptcha(verify) {
            this.captchaValid = true;
            this.captchaValue = verify;
        },
    },
};
</script>

<style scoped>
.loadingBackground {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
