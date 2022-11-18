<template>
    <loading v-if="!display" color="#FFD100" />
    <layout v-else>
        <loading v-if="loading" color="#FFD100" :class="btnLoading === true ? 'loadingBackground' : ''" />
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">สมัครบริการ<br />NT BROADBAND</div>
            </template>
            <template v-slot:body>
                <div class="pa-6">
                    <div class="package-wrap">
                        <div class="d-flex mb-1">
                            <div class="package-label">แพ็กเกจ</div>
                            <div class="package-value">{{ `${package_form.package_name}` }}</div>
                        </div>
                        <div class="d-flex mb-1">
                            <div class="package-label">ความเร็ว</div>
                            <div class="package-value">{{ `${speedConverter(package_form.package_speed)} Mbps` }}</div>
                        </div>
                        <div class="d-flex mb-1">
                            <div class="package-label">ค่าบริการ</div>
                            <div class="package-value">{{ `${numberComma(package_form.package_price)} บาท` }}</div>
                        </div>
                        <div class="d-flex mb-1" v-if="formData.package_onu">
                            <div class="package-label">ค่าอุปกรณ์/ONU</div>
                            <div class="package-value">{{ `${numberCommaWithVAT(formData.package_onu)} บาท` }}</div>
                        </div>
                        <div class="d-flex mb-1" v-if="formData.fee_cost > 0">
                            <div class="package-label">ค่าแรกเข้า</div>
                            <div class="package-value">{{ `${numberCommaWithVAT(formData.fee_cost)} บาท` }}</div>
                        </div>
                        <div class="d-flex mb-1" v-if="formData.setup_cost > 0">
                            <div class="package-label">ค่าติดตั้ง</div>
                            <div class="package-value">{{ `${numberCommaWithVAT(formData.setup_cost)} บาท` }}</div>
                        </div>
                        <div class="d-flex mb-1" v-if="formData.maintenence_cost > 0">
                            <div class="package-label">ค่าช่าง</div>
                            <div class="package-value">{{ `${numberCommaWithVAT(formData.maintenence_cost)} บาท` }}</div>
                        </div>
                        <div class="d-flex mb-1" v-if="formData.over_cable_cost > 0">
                            <div class="package-label">ค่าทางสายเกิน</div>
                            <div class="package-value">{{ `${numberCommaWithVAT(formData.over_cable_cost)} บาท` }}</div>
                        </div>
                    </div>
                    <div class="py-4">
                        <div class="form-title">ข้อมูลส่วนบุคคล</div>
                        <div class="form-group">
                            <label>คำนำหน้าชื่อ*</label>
                            <base-select-option
                                v-model="formData.customer_title"
                                placeholder="เลือกคำนำหน้าชื่อ"
                                :error="formDirty && !formData.customer_title"
                                errorMessage="กรุณาเลือกคำนำหน้าชื่อ"
                                :options="prefixs"
                            />
                            <base-input
                                v-if="formData.customer_title === 'อื่นๆ (โปรดระบุ)'"
                                v-model="formData.customer_title_optional"
                                placeholder="กรอกคำนำหน้าชื่อ"
                                :error="
                                    formDirty &&
                                    formData.customer_title === 'อื่นๆ (โปรดระบุ)' &&
                                    !formData.customer_title_optional
                                "
                                errorMessage="กรุณากรอกคำนำหน้าชื่อ"
                                class="mt-4"
                            />
                        </div>
                        <div class="form-group">
                            <label>ชื่อ*</label>
                            <base-input
                                v-model="formData.customer_first_name"
                                placeholder="กรอกชื่อ"
                                :error="formDirty && !formData.customer_first_name"
                                errorMessage="กรุณากรอกชื่อ"
                            />
                        </div>
                        <div class="form-group">
                            <label>นามสกุล*</label>
                            <base-input
                                v-model="formData.customer_last_name"
                                placeholder="กรอกนามสกุล"
                                :error="formDirty && !formData.customer_last_name"
                                errorMessage="กรุณากรอกนามสกุล"
                            />
                        </div>
                        <div class="form-group">
                            <label>เพศ*</label>
                            <base-select-option
                                v-model="formData.customer_sex"
                                placeholder="เลือกเพศ"
                                :error="formDirty && !formData.customer_sex"
                                errorMessage="กรุณาเลือกเพศ"
                                :options="sexs"
                            />
                            <base-input
                                v-if="formData.customer_sex === 'อื่นๆ (โปรดระบุ)'"
                                v-model="formData.customer_sex_optional"
                                placeholder="กรอกเพศ"
                                :error="
                                    formDirty && formData.customer_sex === 'อื่นๆ (โปรดระบุ)' && !formData.customer_sex_optional
                                "
                                errorMessage="กรุณากรอกเพศ"
                                class="mt-4"
                            />
                        </div>
                        <div class="form-group">
                            <label>เลขบัตรประชาชน/หนังสือเดินทาง*</label>
                            <base-input v-model="formData.personal_id" disabled />
                        </div>
                        <div class="form-group">
                            <label>หมายเลขติดต่อกลับ*</label>
                            <base-input
                                v-model="formData.customer_mobile"
                                placeholder="กรอกหมายเลขติดต่อกลับ"
                                :error="formDirty && formData.customer_mobile.length < 9"
                                errorMessage="กรุณากรอกหมายเลขติดต่อกลับ"
                                maxlength="10"
                                type="tel"
                                @onKeypress="onNumberInput"
                            />
                        </div>
                        <div class="form-group">
                            <label>อีเมล*</label>
                            <base-input
                                v-model="formData.customer_email"
                                placeholder="กรอกอีเมล"
                                :error="emailError"
                                :errorMessage="emailErrorMsg"
                            />
                        </div>
                    </div>
                    <div class="py-4">
                        <div class="form-title">สถานที่ติดตั้ง</div>
                        <div class="form-group">
                            <label>บ้านเลขที่*</label>
                            <base-input
                                v-model="formData.customer_no"
                                placeholder="กรอกบ้านเลขที่"
                                :error="formDirty && !formData.customer_no"
                                errorMessage="กรุณากรอกบ้านเลขที่"
                            />
                        </div>
                        <div class="form-group">
                            <label>อาคาร/หมู่บ้าน</label>
                            <base-input v-model="formData.customer_building" placeholder="กรอกอาคาร/หมู่บ้าน" />
                        </div>
                        <div class="form-group">
                            <label>ถนน</label>
                            <base-input v-model="formData.customer_road" placeholder="กรอกถนน" />
                        </div>
                        <div class="form-group">
                            <label>จังหวัด*</label>
                            <base-select-option
                                v-model="formData.province"
                                placeholder="เลือกจังหวัด"
                                :error="formDirty && !formData.province"
                                errorMessage="กรุณาเลือกจังหวัด"
                                return-object
                                :options="
                                    provinceOption.map((item) => {
                                        return {
                                            value: item.prvnm,
                                            text: item.prvnm,
                                        };
                                    })
                                "
                                @input="onSelectProvince"
                            />
                        </div>
                        <div class="form-group">
                            <label>อำเภอ/เขต*</label>
                            <base-select-option
                                v-model="formData.district"
                                placeholder="เลือกอำเภอ/เขต"
                                :error="formDirty && !formData.district"
                                errorMessage="กรุณาเลือกอำเภอ/เขต"
                                :options="
                                    districtOption.map((item) => {
                                        return {
                                            value: item.distnm,
                                            text: item.distnm,
                                        };
                                    })
                                "
                                @input="onSelectDistrict"
                            />
                        </div>
                        <div class="form-group">
                            <label>ตำบล/แขวง*</label>
                            <base-select-option
                                v-model="formData.customer_subdistrict"
                                placeholder="เลือกตำบล/แขวง"
                                :error="formDirty && !formData.customer_subdistrict"
                                errorMessage="กรุณาเลือกตำบล/แขวง"
                                :options="
                                    subDistrictOption.map((item) => {
                                        return {
                                            value: item.subdistnm,
                                            text: item.subdistnm,
                                        };
                                    })
                                "
                                @input="onSelectSubDistrict"
                            />
                        </div>
                        <div class="form-group">
                            <label>รหัสไปรษณีย์*</label>
                            <base-input
                                v-model="formData.customer_zip"
                                placeholder="กรอกรหัสไปรษณีย์"
                                :error="formDirty && !formData.customer_zip"
                                errorMessage="กรุณากรอกรหัสไปรษณีย์"
                            />
                        </div>
                        <div class="form-group">
                            <label>NT ต้องขออนุญาตนิติบุคลก่อนการเข้าติดตั้งหรือไม่*</label>
                            <div class="d-flex">
                                <div
                                    class="chip-outline-border mr-2"
                                    :class="formData.need_nt_allow == 'yes' ? 'active' : ''"
                                    @click="formData.need_nt_allow = 'yes'"
                                >
                                    ใช่
                                </div>
                                <div
                                    class="chip-outline-border ml-2"
                                    :class="formData.need_nt_allow == 'no' ? 'active' : ''"
                                    @click="formData.need_nt_allow = 'no'"
                                >
                                    ไม่ใช่
                                </div>
                            </div>
                            <div class="message-error" v-if="formDirty && !formData.need_nt_allow">กรุณาเลือกคำตอบ</div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <v-checkbox
                                    v-model="policy_consent"
                                    label="กรุณายอมรับนโยบายคุ้มครองข้อมูลส่วนบุคคล"
                                    hide-details
                                    class="mt-0"
                                    :class="{ 'checkbox-error': formDirty && !policy_consent }"
                                ></v-checkbox>
                                <v-checkbox
                                    v-model="agreement_consent"
                                    label="กรุณายอมรับข้อตกลงการใช้เว็บไซต์ / LINE Official Account"
                                    hide-details
                                    class="mt-0"
                                    :class="{ 'checkbox-error': formDirty && !agreement_consent }"
                                ></v-checkbox>
                                <div class="mt-3 pl-10 text-decoration-underline" @click="termConditionModal = true">
                                    อ่านข้อตกลงและเงื่อนไขการให้บริการ
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
        <Modal :visible="termConditionModal">
            <v-card>
                <v-card-title>
                    <div class="term-condition-title">ข้อตกลงและเงื่อนไขการให้บริการ</div>
                </v-card-title>
                <v-divider></v-divider>
                <div class="term-condition">
                    <v-tabs color="rgb(24, 103, 192)" grow class="content-tabs px-4" v-model="conditionTab">
                        <v-tab>นโยบายคุ้มครองข้อมูลส่วนบุคคล</v-tab>
                        <v-tab>ข้อตกลงการใช้เว็บไซต์</v-tab>
                    </v-tabs>
                    <div class="pa-4">
                        <v-tabs-items v-model="conditionTab">
                            <v-tab-item>
                                <div class="detail" v-html="policy_text"></div>
                            </v-tab-item>
                            <v-tab-item>
                                <div class="detail" v-html="agreement_text"></div>
                            </v-tab-item>
                        </v-tabs-items>
                    </div>
                    <v-divider></v-divider>
                    <div class="py-1 px-4 d-flex">
                        <v-spacer></v-spacer>
                        <v-btn
                            class="ma-2 white--text"
                            color="#1867c0"
                            @click="(termConditionModal = false), (agreement_consent = true), (policy_consent = true)"
                        >
                            ยอมรับ
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </Modal>
        <Modal :visible="confirmFormModal" width="400">
            <v-card class="pa-4 text-center rounded-xl">
                <h3 class="mb-5" data-testid="modal-delete-title" data-cy="modal-delete-title">ยืนยันการกรอกแบบฟอร์ม</h3>
                <div class="d-flex justify-center align-center mb-5">
                    <!-- <img class="w-50" src="../../assets/images/adddel.png" alt=""> -->
                </div>
                <div class="d-flex align-center justify-center mt-6">
                    <base-button :backgroundColor="`white`" label="ยกเลิก" @onClick="confirmFormModal = false" />
                    <div class="ml-2"></div>
                    <base-button label="ยืนยัน" @onClick="onFormConfirm" />
                </div>
            </v-card>
        </Modal>
    </layout>
</template>

<script>
import { province, district, subDistrict } from '../../../utility/address';
import { validate_email, checkEmojiAndSpecialChar, checkEmojiAndSpecialCharExceptEmailPattern, checkEmoji } from '@/utility/helper';
import { registerFormAPI, getDetailRegisterService, checkBackList } from '@/apis/register-service';
import { getTermAndCondition } from '@/apis/term-and-conditon';

export default {
    data() {
        const userProfile = $cookies.get('LINE_LIFF_DATA');
        const registerData = this.$cookies.get('REGISTER_DATA') || {
            customerid: '',
            title: '',
            fname: '',
            lname: '',
            ca_status: '',
            ca_blacklist: '',
            customertypecode: '',
            customertypename: '',
            customersubtypecode: '',
            customersubtypename: '',
            customerclass: '',
            companytitle: '',
            companyname: '',
            companybranch: '',
            governmentcode: '',
            createddatetime: '',
            emailaddress: '',
            passportno: '',
            registrationid: '',
            citizenid: '',
            ca_taxid: '',
            rootcustomerid: '',
            parentcustomerid: '',
            ca_mobileno1: '',
            ca_mobileno2: '',
            telephoneno: '',
            telephoneextensionno: '',
            faxno: '',
            ca_consentpdpa: '',
            addr_id: '',
            code: '',
            no: '',
            roomno: '',
            floorno: '',
            villagename: '',
            buildingname: '',
            moo: '',
            soi: '',
            road: '',
            subdistrictname: '',
            districtname: '',
            provincename: '',
            zipcode: '',
            countryname: '',
            personalId: '',
        };

        return {
            registerData,
            conditionTab: 0,
            display: false,
            loading: true,
            btnLoading: false,
            formDirty: false,
            termConditionModal: false,
            confirmFormModal: false,
            package_form: {
                package_name: '',
                package_speed: '0',
                package_price: 0,
                package_onu: 0,
            },
            formData: {
                form_id: this.$router.history.current.query.id,
                cid: registerData.personalId,
                customer_title: '',
                customer_title_optional: '',
                customer_first_name: '',
                customer_last_name: '',
                customer_sex: '',
                customer_sex_optional: '',
                personal_id: this.removeDash(registerData.personalId),
                customer_mobile: '',
                customer_email: '',
                customer_no: '',
                customer_building: '',
                customer_road: '',
                customer_subdistrict: '',
                customer_zip: '',
                province: '',
                district: '',
                package_id: '',
                is_consent: false,
                consent_version: null,
                need_nt_allow: '',
                customer_district_id: '',
                customer_province_id: '',
                line_user_id: userProfile.userId,
                fee_cost: 0,
                over_cable_cost: 0,
                maintenence_cost: 0,
                setup_cost: 0,
            },
            prefixs: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ (โปรดระบุ)'],
            sexs: [
                {
                    value: 1,
                    text: 'ชาย',
                },
                {
                    value: 2,
                    text: 'หญิง',
                },
            ],
            provinceOption: province,
            districtOption: district,
            subDistrictOption: subDistrict,
            subDistrictId: '',
            userProfile,
            agreement_consent: false,
            policy_consent: false,
            agreement_text: '',
            policy_text: '',
            termAndCondition_version: null,
            emailError: false,
            emailErrorMsg: '',
        };
    },
    watch: {
        'formData.customer_first_name'(val) {
            this.formData.customer_first_name = checkEmojiAndSpecialChar(val);
        },
        'formData.customer_last_name'(val) {
            this.formData.customer_last_name = checkEmojiAndSpecialChar(val);
        },
        'formData.customer_title_optional'(val) {
            this.formData.customer_title_optional = checkEmojiAndSpecialChar(val);
        },
        'formData.customer_mobile'(val) {
            this.formData.customer_mobile = checkEmojiAndSpecialChar(val);
        },
        'formData.customer_email'(val) {
            this.formData.customer_email = checkEmojiAndSpecialCharExceptEmailPattern(val);
        },
        'formData.customer_no'(val) {
            this.formData.customer_no = checkEmoji(val);
        },
        'formData.customer_building'(val) {
            this.formData.customer_building = checkEmojiAndSpecialChar(val);
        },
        'formData.customer_road'(val) {
            this.formData.customer_road = checkEmojiAndSpecialChar(val);
        },
        'formData.customer_zip'(val) {
            this.formData.customer_zip = checkEmojiAndSpecialChar(val);
        },
    },
    mounted() {
        document.title = 'สมัครบริการ NT BROADBAND';

        gtag('config', process.env.VUE_APP_GTAG_CONFIG, {
            page_title: 'สมัครบริการ NT BROADBAND',
        });

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
                    this.package_form.package_name = resData.promotion_name;
                    this.package_form.package_speed = resData.promotion_speed;
                    this.package_form.package_price = resData.promotion_price;

                    this.package_form.package_onu = resData.instrument_cost_ont;

                    this.formData.fee_cost = parseFloat(resData.order_status_cost_fee);
                    this.formData.over_cable_cost = parseFloat(resData.order_status_cost_over_cable);
                    this.formData.maintenence_cost = parseFloat(resData.order_status_cost_maintenance);
                    this.formData.setup_cost = parseFloat(resData.order_status_cost_setup);

                    this.formData.customer_title = this.registerData.title;
                    this.formData.customer_first_name = this.registerData.baFirstname;
                    this.formData.customer_last_name = this.registerData.baLastname;
                    this.formData.customer_mobile =
                        this.removeDash(this.registerData.ca_mobileno1) ||
                        this.removeDash(this.registerData.ca_mobileno2) ||
                        this.removeDash(this.registerData.telephoneextensionno) ||
                        this.removeDash(this.registerData.telephoneno);
                    this.formData.customer_email = this.registerData.emailaddress;
                    this.formData.customer_no = this.registerData.no;
                    this.formData.customer_building = this.registerData.buildingname;
                    this.formData.customer_road = this.registerData.road;
                    if (this.registerData.provincename !== '') {
                        let provinceData = province.find((itm) => itm.prvnm === this.registerData.provincename);
                        let districtData = district.find(
                            (itm) => itm.distnm === this.registerData.districtname && provinceData.prvid === itm.prvid
                        );

                        this.formData.province = this.registerData.provincename;
                        this.formData.district = this.registerData.districtname;

                        this.formData.customer_province_id = !provinceData ? '' : provinceData.prvid;
                        this.formData.customer_district_id = !districtData ? '' : districtData.distid;
                    }

                    this.formData.customer_subdistrict = this.registerData.subdistrictname;
                    this.formData.customer_zip = this.registerData.zipcode;

                    this.renderTermAndCondition();
                    this.display = true;
                    this.loading = false;
                },
                cbError: (e, msg) => {
                    this.$toast.error('ระบบขัดข้อง');
                    this.loading = false;
                },
            });
        },
        async onSubmit() {
            this.formDirty = true;
            if (
                this.formData.customer_title === '' ||
                this.formData.customer_first_name === '' ||
                this.formData.customer_last_name === '' ||
                this.formData.customer_sex === '' ||
                this.formData.customer_mobile === '' ||
                this.formData.customer_no === '' ||
                this.formData.customer_province_id === '' ||
                this.formData.customer_district_id === '' ||
                this.formData.customer_subdistrict === '' ||
                this.formData.customer_zip === '' ||
                this.formData.need_nt_allow === '' ||
                this.formData.customer_mobile.length < 8 ||
                this.formData.customer_email === ''
            ) {
                if (this.formData.customer_email === '') {
                    this.emailError = true;
                    this.emailErrorMsg = 'กรุณากรอกอีเมล';
                }

                this.$toast.warning('กรุณากรอกข้อมูลให้ครบ');
                return;
            }

            if (this.formData.customer_email === '') {
                this.emailError = true;
                this.emailErrorMsg = 'กรุณากรอกอีเมล';
                this.$toast.warning('กรุณากรอกอีเมล');
                return;
            }

            if (validate_email(this.formData.customer_email) === false) {
                this.emailError = true;
                this.emailErrorMsg = 'กรุณากรอกอีเมลให้ถูกต้อง';
                this.$toast.warning('กรุณากรอกอีเมลให้ถูกต้อง');
                return;
            } else {
                this.emailError = false;
                this.emailErrorMsg = '';
            }

            if (this.policy_consent === false || this.agreement_consent === false) {
                this.emailError = false;
                this.emailErrorMsg = '';
                this.$toast.warning('กรุณายอมรับข้อตกลงและเงื่อนไข');
                return;
            }

            this.confirmFormModal = true;
        },
        async onFormConfirm() {
            this.btnLoading = true;
            this.loading = true;
            this.formData.consent_version = this.termAndCondition_version;
            this.formData.is_consent = true;

            await registerFormAPI({
                formData: this.formData,
                cbSuccess: (res) => {
                    if (res.status === 200) {
                        this.btnLoading = false;
                        this.loading = false;
                        this.confirmFormModal = false;
                        this.$toast.success('บันทึกข้อมูลสำเร็จ');
                        this.$router.push(`/register/broadband/success?id=${res.data.data.id}`);
                    }
                },
                cbError: (e, msg) => {
                    this.btnLoading = false;
                    this.loading = false;
                    this.confirmFormModal = false;

                    let toastMsg = '';

                    if (msg.response.status === 400 && msg.response.message !== '') {
                        this.$toast.error(msg.response.message);
                        return;
                    }

                    if (msg.response.status === 400) {
                        this.$toast.error('ระบบขัดข้อง');
                        return;
                    }

                    if (msg.response.data.data.errors.validation) {
                        msg.response.data.data.errors.validation[0].map((itm) => {
                            toastMsg += itm.require.detail.th + ', \n';
                        });

                        this.btnLoading = false;
                        this.loading = false;
                        this.$toast.warning(toastMsg);
                        return;
                    }

                    if (msg.response.data.data.errors.notice) {
                        msg.response.data.data.errors.notice.map((itm) => {
                            toastMsg += itm._th + ', \n';
                        });

                        this.btnLoading = false;
                        this.loading = false;
                        this.$toast.warning(toastMsg);
                        return;
                    }
                    this.$toast.error('ระบบขัดข้อง');
                },
            });
        },
        onSelectProvince(provinceName) {
            let prvid = province.find((itm) => itm.prvnm === provinceName).prvid;
            this.districtOption = district.filter((itm) => itm.prvid === prvid).map((itm) => ({ distnm: itm.distnm }));
            this.formData.customer_province_id = prvid;
        },
        onSelectDistrict(districtName) {
            let distid = district.find((itm) => itm.distnm === districtName).distid;
            this.subDistrictOption = subDistrict
                .filter((itm) => itm.distid === distid)
                .map((itm) => ({ subdistnm: itm.subdistnm }));
            this.formData.customer_district_id = distid;
        },
        onSelectSubDistrict(subDistrictName) {
            let zipcode = subDistrict.find(
                (itm) => itm.subdistnm === subDistrictName && itm.distid === this.formData.customer_district_id
            ).zipcode;
            this.formData.customer_zip = zipcode;
        },
        numberComma(number) {
            if (!number) return 0;
            return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
        },
        async renderTermAndCondition() {
            await getTermAndCondition({
                formData: {},
                cbSuccess: (res) => {
                    let resData = res.data.data;
                    this.policy_text = resData.detail.policy;
                    this.agreement_text = resData.detail.agreement;
                    this.termAndCondition_version = resData.version;
                },
                cbError: (e, msg) => {},
            });
        },
        numberCommaWithVAT(number) {
            let vat = 7;
            if (!number) return 0;
            return ((parseFloat(number) * vat) / 100 + parseFloat(number)).toLocaleString(undefined, {
                minimumFractionDigits: 2,
            });
        },
        removeDash(str) {
            if (str.includes('-')) {
                return str.replaceAll('-', '');
            }
            return str;
        },
        speedConverter(speedStr) {
            let realSpeed = '';
            if (!speedStr) return realSpeed;
            realSpeed = `${speedStr.split('/')[0] / 1024}/${speedStr.split('/')[1] / 1024}`;
            return realSpeed;
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
    },
};
</script>

<style lang="scss" scoped>
.package-wrap {
    border: 1.5px solid #545859;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    background-color: #ffffff;
    padding: 8px 16px;
    & .package-label {
        width: 110px;
        font-size: 16px;
        font-weight: 400;
        color: #545859;
    }
    & .package-value {
        font-weight: 700;
        color: #222222;
    }
}
.chip-outline-border {
    height: 44px;
    border: 1px solid #545859;
    border-radius: 24px;
    width: 100%;
    font-size: 18px;
    font-weight: 700;
    color: #545859;
    display: flex;
    align-items: center;
    justify-content: center;
    &.active {
        border: 3px solid #ffd100;
        box-shadow: 0px 0px 6px rgba(255, 209, 0, 0.5);
    }
}

.loadingBackground {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
