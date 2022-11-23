<template>
    <loading v-if="!display" color="#FFD100" />
    <layout v-else>
        <loading v-if="loading" color="#FFD100" :class="btnLoading === true ? 'loadingBackground' : ''" />
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">ลงทะเบียน<br /></div>
            </template>
            <template v-slot:body>
                <div class="py-2 px-6">
                    <div class="form-group">
                        <base-input
                            v-model="formData.first_name"
                            placeholder="ชื่อ*"
                            :error="formDirty && !formData.first_name"
                            errorMessage="กรุณากรอกชื่อ"
                        />
                    </div>
                    <div class="form-group">
                        <base-input
                            v-model="formData.last_name"
                            placeholder="นามสกุล"
                            :error="formDirty && !formData.last_name"
                            errorMessage="กรุณากรอกนามสกุล"
                        />
                    </div>
                    <div class="form-group">
                        <base-input
                            v-model="formData.mobile"
                            placeholder="โทรศัพท์มือถือ*"
                            :error="formDirty && formData.mobile.length < 9"
                            errorMessage="กรุณากรอกหมายเลขโทรศัพท์มือถือ"
                            type="tel"
                            maxlength="10"
                            @onKeypress="onNumberInput"
                        />
                    </div>
                    <div class="form-group">
                        <base-input v-model="formData.email" placeholder="อีเมล" />
                    </div>
                    <div class="form-group">
                        <label>ปัจจุบันคุณเป็นลูกค้านิสสันหรือไม่หรือไม่*</label>
                        <v-radio-group v-model="formData.nissan_customer" row hide-details class="mb-2 mt-0 d-flex">
                            <v-radio label="ใช่" :value="true"></v-radio>
                            <v-radio label="ไม่ใช่" :value="false"></v-radio>
                        </v-radio-group>
                        <div class="message-error" v-if="formDirty && formData.nissan_customer === null">กรุณาเลือกคำตอบ</div>
                    </div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.current_car_brand"
                            placeholder="รถปัจจุบันของคุณคือยี่ห้อ หรือ รุ่นใด*"
                            :error="formDirty && !formData.current_car_brand"
                            errorMessage="กรุณาเลือกรุ่นรถปัจจุบันของคุณ"
                            :options="current_car_brand_list"
                        />
                        <base-input
                            v-if="formData.current_car_brand === 'อื่นๆ'"
                            v-model="formData.current_car_brand_optional"
                            placeholder="กรอกชื่อรุ่น"
                            :error="formDirty && formData.current_car_brand === 'อื่นๆ' && !formData.current_car_brand_optional"
                            errorMessage="กรุณากรอกชื่อรุ่น"
                            class="mt-4"
                        />
                    </div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.interested_car"
                            placeholder="รุ่นรถที่สนใจ*"
                            :error="formDirty && !formData.interested_car"
                            errorMessage="กรุณาเลือกรุ่นรถปัจจุบันของคุณ"
                            :options="interested_car_list"
                        />
                        <div class="message-error" v-if="formDirty && formData.interested_car === ''">
                            กรุณาเลือกรุ่นรถที่สนใจ
                        </div>
                    </div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.buying_plan"
                            placeholder="เลือกช่วง"
                            :error="formDirty && !formData.buying_plan"
                            errorMessage="กรุณาเลือกช่วง"
                            :options="buying_plan_list"
                        />
                    </div>
                    <div class="form-group">
                        <label>ปัจจัยที่ทำให้คุณตัดสินใจซื้อรถ ตอบได้สูงสุด 3 ข้อ</label>
                        <v-checkbox
                            v-for="(item, index) in buying_factor_list"
                            :key="index"
                            :value="item"
                            :label="item"
                            v-model="formData.buying_factor"
                            hide-details
                            :error="formDirty && formData.buying_factor.length === 0"
                            :disabled="formData.buying_factor.length > 2 && formData.buying_factor.indexOf(item) === -1"
                        ></v-checkbox>
                        <base-input
                            v-if="formData.buying_factor.includes('อื่นๆ')"
                            v-model="formData.buying_factor_optional"
                            placeholder="กรอกอื่นๆ"
                            :error="formDirty && formData.buying_factor.includes('อื่นๆ') && !formData.buying_factor_optional"
                            errorMessage="กรุณากรอกอื่นๆ"
                            class="mt-4"
                        />
                        <div class="message-error" v-if="formDirty && formData.buying_factor.length === 0">
                            กรุณาเลือกปัจจัยที่ทำให้คุณตัดสินใจซื้อรถ
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="px-6">
                    <div class="form-title">ยอมรับข้อตกลงและเงื่อนไขทั้งหมด</div>
                    <div class="form-group">
                        <v-checkbox
                            v-model="formData.consent_1"
                            label="กรุณายอมรับข้อตกลงและเงื่อนไข"
                            hide-details
                            class="mt-0"
                        ></v-checkbox>
                        <v-checkbox
                            v-model="formData.consent_2"
                            label="กรุณายอมรับข้อตกลงและเงื่อนไข"
                            hide-details
                            class="mt-2"
                        ></v-checkbox>
                        <v-checkbox
                            v-model="formData.consent_3"
                            label="กรุณายอมรับข้อตกลงและเงื่อนไข"
                            hide-details
                            class="mt-2"
                        ></v-checkbox>
                    </div>
                </div>
                <div class="d-flex justify-center align-center pa-6">
                    <base-button
                        @onClick="onSubmit"
                        shadow
                        :label="btnLoading === true ? 'กำลังโหลด...' : 'ลงทะเบียน'"
                        :disabled="btnLoading === true ? true : false"
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
                    <!-- <v-tabs color="rgb(24, 103, 192)" grow class="content-tabs px-4" v-model="conditionTab">
                        <v-tab>นโยบายคุ้มครองข้อมูลส่วนบุคคล</v-tab>
                        <v-tab>ข้อตกลงการใช้เว็บไซต์</v-tab>
                    </v-tabs> -->
                    <!-- <div class="pa-4">
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
                    </div> -->
                </div>
            </v-card>
        </Modal>
        <Modal :visible="termConditionAcceptModal">
            <v-card>
                <v-card-title class="justify-center">
                    <div class="term-condition-title">กรุณากดยอมรับเงื่อนไข</div>
                </v-card-title>
                <div class="term-condition">
                    <div class="py-1 px-4 text-center">
                        <v-btn
                            class="ma-2 white--text"
                            color="#1867c0"
                            @click="(termConditionAcceptModal = false), (termConditionAccept_Status = true)"
                        >
                            ตกลง
                        </v-btn>
                    </div>
                </div>
            </v-card>
        </Modal>
    </layout>
</template>

<script>
import { registerForm } from '@/apis/api';

export default {
    data() {
        const userProfile = $cookies.get('LINE_LIFF_DATA');
        return {
            display: false,
            loading: true,
            btnLoading: false,
            formDirty: false,
            termConditionModal: false,
            termConditionAcceptModal: false,
            termConditionAccept_Status: false,
            buying_factor_checkbox_disabled: false,
            formData: {
                first_name: '',
                last_name: '',
                mobile: '',
                email: '',
                nissan_customer: null,
                current_car_brand: '',
                current_car_brand_optional: '',
                interested_car: '',
                buying_plan: '',
                buying_factor: [],
                buying_factor_optional: '',
                consent_1: false,
                consent_2: false,
                consent_3: false,
                line_user_id: userProfile.userId,
            },
            current_car_brand_list: ['ไม่มี', 'FORD', 'TOYOTA', 'MAZDA', 'GWM', 'MITSUBISHI', 'ISUZU', 'MGHONDA', 'อื่นๆ'],
            interested_car_list: [
                'นิสสัน คิกส์ อี-พาวเวอร์ใหม่',
                'นิสสัน นาวารา PRO-4X / PRO-2X ใหม่',
                'นิสสัน นาวารา คาลิเบอร์ ใหม่',
                'นิสสัน นาวารา คิงแค็บ ใหม่',
                'นิสสัน นาวารา ซิงเกิ้ลแค็บ ใหม่',
                'นิสสัน เทอร์ร่า ใหม่',
                'นิสสัน อัลเมร่า ใหม่',
                'นิสสัน ลีฟ',
                'นิสสัน GT-R',
                'นิสสัน เออร์แวน',
            ],
            buying_plan_list: [
                'ภายในงาน Motor Expo (1-12 ธันวาคม 2565)',
                'ภายใน 1 เดือน',
                'ภายใน 1-3 เดือน',
                '3 เดือนเป็นต้นไป',
                'ยังไม่มีแผนในการซื้อ',
                'จองรถแล้ว',
            ],
            buying_factor_list: [
                'เทคโนโลยีระบบความปลอดภัย',
                'ดีไซน์ภายนอก',
                'ดีไซน์ภายใน',
                'บริการหลังการขาย',
                'สมรรถนะของเครื่องยนต์',
                'ประหยัดน้ำมัน / ไฟฟ้า',
                'เปลี่ยนเป็นรถครอบครัว / รถที่ใหญ่ขึ้น',
                'อยากมีสถานะทางสังคมที่ดี (social status)',
                'อื่นๆ',
            ],
        };
    },
    mounted() {
        document.title = 'ลงทะเบียน';
        this.display = true;
        this.loading = false;
    },
    methods: {
        async onSubmit() {
            this.formDirty = true;

            if (
                this.formData.first_name === '' ||
                this.formData.last_name === '' ||
                this.formData.mobile === '' ||
                this.formData.nissan_customer === null ||
                this.formData.current_car_brand === '' ||
                this.formData.interested_car === '' ||
                this.formData.buying_plan === '' ||
                this.formData.buying_factor.length === 0
            ) {
                return this.$toast.warning('กรุณากรอกข้อมูลให้ครบ');
            }

            if (
                this.termConditionAccept_Status === false &&
                (this.formData.consent_1 === false || this.formData.consent_2 === false || this.formData.consent_3 === false)
            ) {
                this.termConditionAcceptModal = true;
                return;
            }

            if (this.formData.current_car_brand === 'อื่นๆ') {
                this.formData.current_car_brand = this.formData.current_car_brand_optional;
            }

            if (this.formData.buying_factor.includes('อื่นๆ')) {
                this.formData.buying_factor.push(this.formData.buying_factor_optional);
            }

            this.btnLoading = true;
            this.loading = true;
            await registerForm({
                formData: {
                    ...this.formData,
                    buying_factor: this.formData.buying_factor.filter((e) => e !== 'อื่นๆ').toString(),
                },
                cbSuccess: (res) => {
                    if (res.status === 200) {
                        this.btnLoading = false;
                        this.loading = false;
                        this.$router.push('/register/success');
                    }
                },
                cbError: (e, msg) => {
                    this.btnLoading = false;
                    this.loading = false;
                    this.$toast.error('ระบบขัดข้อง');
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
    },
};
</script>

<style style lang="scss" scoped>
.term-condition-title {
    font-weight: 700;
    font-size: 18px;
}
.loadingBackground {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
