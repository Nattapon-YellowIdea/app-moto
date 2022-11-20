<template>
    <loading v-if="!display" color="#FFD100" />
    <layout v-else>
        <loading v-if="loading" color="#FFD100" :class="btnLoading === true ? 'loadingBackground' : ''" />
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">ลงทะเบียน Form 1<br /></div>
            </template>
            <template v-slot:body>
                <div class="py-2 px-6">
                    <div class="form-group">
                        <label>ชื่อ*</label>
                        <base-input
                            v-model="formData.first_name"
                            placeholder="กรอกชื่อ"
                            :error="formDirty && !formData.first_name"
                            errorMessage="กรุณากรอกชื่อ"
                        />
                    </div>
                    <div class="form-group">
                        <label>นามสกุล*</label>
                        <base-input
                            v-model="formData.last_name"
                            placeholder="กรอกนามสกุล"
                            :error="formDirty && !formData.last_name"
                            errorMessage="กรุณากรอกนามสกุล"
                        />
                    </div>
                    <div class="form-group">
                        <label>โทรศัพท์มือถือ*</label>
                        <base-input
                            v-model="formData.mobile"
                            placeholder="กรอกหมายโทรศัพท์มือถือ"
                            :error="formDirty && formData.mobile.length < 9"
                            errorMessage="กรุณากรอกหมายเลขโทรศัพท์มือถือ"
                            type="tel"
                            maxlength="10"
                            @onKeypress="onNumberInput"
                        />
                    </div>
                    <div class="form-group">
                        <label>อีเมล</label>
                        <base-input v-model="formData.email" placeholder="กรอกอีเมล" />
                    </div>
                    <div class="form-group">
                        <label>ปัจจุบันคุณเป็นลูกค้านิสสันหรือไม่หรือไม่*</label>
                        <v-radio-group v-model="formData.nissan_customer" row hide-details class="mb-2 d-flex">
                            <v-radio label="ใช่" :value="true"></v-radio>
                            <v-radio label="ไม่ใช่" :value="false"></v-radio>
                        </v-radio-group>
                        <div class="message-error" v-if="formDirty && formData.nissan_customer === null">กรุณาเลือกคำตอบ</div>
                    </div>
                    <div class="form-group">
                        <label>รถปัจจุบันของคุณคือยี่ห้อ หรือ รุ่นใด*</label>
                        <base-select-option
                            v-model="formData.current_car_brand"
                            placeholder="เลือกรุ่น"
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
                        <label>รุ่นรถที่สนใจ ตอบได้มากกว่า 1*</label>
                        <v-checkbox
                            v-for="(item, index) in interested_car_list"
                            :key="index"
                            :label="item"
                            :value="item"
                            v-model="formData.interested_car"
                            hide-details
                            :error="formDirty && formData.interested_car.length === 0"
                        ></v-checkbox>
                        <div class="message-error" v-if="formDirty && formData.interested_car.length === 0">
                            กรุณาเลือกรุ่นรถที่สนใจ
                        </div>
                    </div>

                    <div class="form-group">
                        <label>คุณมีการวางแผนที่จะซื้อรถยนต์เมื่อใด*</label>
                        <base-select-option
                            v-model="formData.buying_plan"
                            placeholder="เลือกช่วง"
                            :error="formDirty && !formData.buying_plan"
                            errorMessage="กรุณาเลือกช่วง"
                            :options="buying_plan_list"
                        />
                    </div>
                    <div class="form-group">
                        <label>ปัจจัยที่ทำให้คุณตัดสินใจซื้อรถ ตอบได้มากกว่า1*</label>
                        <v-checkbox
                            v-for="(item, index) in buying_factor_list"
                            :key="index"
                            :value="item"
                            :label="item"
                            v-model="formData.buying_factor"
                            hide-details
                            :error="formDirty && formData.buying_factor.length === 0"
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
                            v-model="formData.consent"
                            label="กรุณายอมรับนโยบายคุ้มครองข้อมูลส่วนบุคคล"
                            hide-details
                            class="mt-0"
                            :class="{ 'checkbox-error': formDirty && !formData.consent }"
                        ></v-checkbox>
                        <div class="mt-3 pl-10 text-decoration-underline" @click="termConditionModal = true">
                            อ่านข้อตกลงและเงื่อนไขการให้บริการ
                        </div>
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
                    <v-tabs color="rgb(24, 103, 192)" grow class="content-tabs px-4" v-model="conditionTab">
                        <v-tab>นโยบายคุ้มครองข้อมูลส่วนบุคคล</v-tab>
                        <v-tab>ข้อตกลงการใช้เว็บไซต์</v-tab>
                    </v-tabs>
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
    </layout>
</template>

<script>
// import { province, district, subDistrict } from '@/utility/address';
// import { LeadFormAPI } from '@/apis/register-service';
// import { checkEmojiAndSpecialChar, checkEmoji } from '@/utility/helper';

export default {
    data() {
        const userProfile = $cookies.get('LINE_LIFF_DATA');
        return {
            conditionTab: 0,
            display: false,
            loading: true,
            btnLoading: false,
            formDirty: false,
            exampleModal: false,
            termConditionModal: false,
            policy_consent: false,
            formData: {
                first_name: '',
                last_name: '',
                mobile: '',
                email: '',
                nissan_customer: null,
                current_car_brand: '',
                interested_car: [],
                buying_plan: '',
                buying_factor: [],
                consent: false,
                // line_user_id: userProfile.userId,
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
                'เปลี่ยนเป้นรถครอบครัว / รถที่ใหญ่ขึ้น',
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
                this.formData.interested_car.length === 0 ||
                this.formData.buying_plan === '' ||
                this.formData.buying_factor.length === 0 ||
                this.formData.consent === false
            ) {
                this.$toast.warning('กรุณากรอกข้อมูลให้ครบ');
            } else {
                console.log(this.formData);
                // this.btnLoading = true;
                // this.loading = true;
                // let addressStr = ``,
                //     dateCombine;
                // if (this.formData.no !== '' || this.formData.no !== '-') {
                //     addressStr += this.formData.no;
                // }
                // if (this.formData.building !== '' || this.formData.building !== '-') {
                //     addressStr += this.formData.building;
                // }
                // if (this.selectedTime === 'morning') {
                //     dateCombine = `${this.formData.date_install.substring(0, 10)} 10:00:00`;
                // }
                // if (this.selectedTime === 'afternoon') {
                //     dateCombine = `${this.formData.date_install.substring(0, 10)} 13:00:00`;
                // }

                // this.formData.address = addressStr;
                // this.formData.date_install = dateCombine;
                // await LeadFormAPI({
                //     formData: this.formData,
                //     cbSuccess: (res) => {
                //         if (res.status === 200) {
                //             this.btnLoading = false;
                //             this.loading = false;
                //             this.$router.push('/register/fixed-line/form/success');
                //         }
                //     },
                //     cbError: (e, msg) => {
                //         this.btnLoading = false;
                //         this.loading = false;
                //         this.$toast.error('ระบบขัดข้อง');
                //     },
                // });
            }
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
.select-time {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & .time-item-wrap {
        width: 50%;
        margin-bottom: 8px;
        padding: 0 8px;
        & .time-item {
            height: 44px;
            border: 1px solid #222222;
            border-radius: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 18px;
            color: #545859;
            &.time-item-selected {
                box-shadow: 0px 0px 6px rgba(255, 209, 0, 0.5);
                border: 3px solid #ffd100;
                color: #222222;
            }
            &.time-item-unavailable {
                border: 1px solid #bbbbbb;
                background: #f0f0f0;
                color: #bbbbbb;
                pointer-events: none;
            }
            &.time-item-error {
                border: 1px solid red;
                color: red;
            }
        }
    }
}
.loadingBackground {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
