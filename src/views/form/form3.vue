<template>
    <loading v-if="!display" color="#FFD100" />
    <layout v-else>
        <loading v-if="loading" color="#FFD100" :class="btnLoading === true ? 'loadingBackground' : ''" />
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">ลงทะเบียน Form 3<br /></div>
            </template>
            <template v-slot:body>
                <div class="py-2 px-6">
                    <div class="form-title">ข้อมูลส่วนตัว</div>
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
                            placeholder="นามสกุล*"
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
                        <base-select-option
                            v-model="formData.sex"
                            placeholder="เพศ*"
                            :error="formDirty && !formData.sex"
                            errorMessage="กรุณาเลือกเพศ"
                            :options="['ชาย', 'หญิง', 'ไม่ต้องการแจ้ง']"
                        />
                    </div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.age"
                            placeholder="อายุ*"
                            :error="formDirty && !formData.age"
                            errorMessage="กรุณาเลือกอายุ"
                            :options="age_list"
                        />
                    </div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.status"
                            placeholder="สถานะภาพ*"
                            :error="formDirty && !formData.status"
                            errorMessage="กรุณาเลือกสถานะภาพ"
                            :options="['โสด', 'สมรส']"
                        />
                    </div>

                    <div class="form-group">
                        <base-input
                            v-model="formData.child_amt"
                            placeholder="จำนวนบุตร (คน)*"
                            :error="formDirty && !formData.child_amt"
                            errorMessage="กรุณากรอกจำนวนบุตร"
                            type="tel"
                            maxlength="2"
                            @onKeypress="onNumberInput"
                        />
                    </div>
                    <div class="form-group">
                        <base-input
                            v-model="formData.family_member_amt"
                            placeholder="จำนวนสมาชิกในครอบครัว (คน)*"
                            :error="formDirty && !formData.family_member_amt"
                            errorMessage="กรุณากรอกจำนวนสมาชิกในครอบครัวอ"
                            type="tel"
                            maxlength="2"
                            @onKeypress="onNumberInput"
                        />
                    </div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.educate"
                            placeholder="การศึกษา*"
                            :error="formDirty && !formData.educate"
                            errorMessage="กรุณาเลือกการศึกษา*"
                            :options="educate_list"
                        />
                    </div>
                </div>
                <!--=================================================================-->
                <div class="py-2 px-6">
                    <div class="form-title">อาชีพ</div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.career"
                            placeholder="อาชีพ*"
                            :error="formDirty && !formData.career"
                            errorMessage="กรุณาเลือกอาชีพ"
                            :options="career_list"
                        />
                    </div>
                    <div class="form-group" v-if="formData.career === 'อื่นๆ'">
                        <base-input
                            v-model="formData.career_optional"
                            placeholder="โปรดระบุ*"
                            :error="formDirty && !formData.career_optional"
                            errorMessage="กรุณากรอกอื่นๆ"
                        />
                    </div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.monthly_income"
                            placeholder="รายได้ครอบครัวต่อเดือน*"
                            :error="formDirty && !formData.monthly_income"
                            errorMessage="กรุณาเลือกรายได้ครอบครัวต่อเดือน"
                            :options="monthly_income_list"
                        />
                    </div>
                </div>
                <!--=================================================================-->
                <div class="py-2 px-6">
                    <div class="form-title">จุดประสงค์ในการซื้อรถ</div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.buying_purpose"
                            placeholder="จุดประสงค์ในการซื้อรถ*"
                            :error="formDirty && !formData.buying_purpose"
                            errorMessage="กรุณาเลือกจุดประสงค์ในการซื้อรถ"
                            :options="purpose_list"
                        />
                    </div>
                </div>
                <!--=================================================================-->
                <div class="py-2 px-6">
                    <div class="form-title">ประสบการณ์ในการทดลองขับ</div>
                    <small>(โปรดให้คะแนนความพึงพอใจของท่าน โดย 5 = พึงพอใจมากที่สุด และ 1 = พึงพอใจน้อยที่สุด)</small>
                    <div class="form-group">
                        <label class="label-title">1. เครื่องยนต์อัตราเร่งดี</label>
                        <base-select-option
                            v-model="formData.satisfaction_rate_1"
                            placeholder="ระดับความพึงพอใจ*"
                            :error="formDirty && !formData.satisfaction_rate_1"
                            errorMessage="กรุณาเลือกระดับความพึงพอใจ"
                            :options="
                                satisfaction_rate.map((item) => {
                                    return {
                                        value: item.value,
                                        text: item.label,
                                    };
                                })
                            "
                        />
                    </div>
                    <div class="form-group">
                        <label class="label-title">2. ภาพรวมความนุ่มนวลในการขับขี่</label>
                        <base-select-option
                            v-model="formData.satisfaction_rate_2"
                            placeholder="ระดับความพึงพอใจ"
                            :error="formDirty && !formData.satisfaction_rate_2"
                            errorMessage="กรุณาเลือกระดับความพึงพอใจ"
                            :options="
                                satisfaction_rate.map((item) => {
                                    return {
                                        value: item.value,
                                        text: item.label,
                                    };
                                })
                            "
                        />
                    </div>
                    <div class="form-group">
                        <label class="label-title">3. การออกแบบดีไซน์ภายนอกโฉบเฉี่ยว</label>
                        <base-select-option
                            v-model="formData.satisfaction_rate_3"
                            placeholder="ระดับความพึงพอใจ"
                            :error="formDirty && !formData.satisfaction_rate_3"
                            errorMessage="กรุณาเลือกระดับความพึงพอใจ"
                            :options="
                                satisfaction_rate.map((item) => {
                                    return {
                                        value: item.value,
                                        text: item.label,
                                    };
                                })
                            "
                        />
                    </div>
                </div>
                <!--=================================================================-->
                <div class="py-2 px-6">
                    <div class="form-title">หลังทดลองขับ ท่านได้ทำอะไรต่อหรือไม่</div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.after_drive_test"
                            placeholder="หลังทดลองขับ ท่านได้ทำอะไรต่อหรือไม่*"
                            :error="formDirty && !formData.after_drive_test"
                            errorMessage="กรุณาเลือก"
                            :options="after_drive_list"
                        />
                        <br v-if="formData.after_drive_test === 'ไม่ได้ทำอะไรต่อ / ไม่ได้จองรถ'" />
                        <base-select-option
                            v-if="formData.after_drive_test === 'ไม่ได้ทำอะไรต่อ / ไม่ได้จองรถ'"
                            v-model="formData.after_drive_test_reason"
                            placeholder="เพราะเหตุใด*"
                            :error="formDirty && !formData.after_drive_test_reason"
                            errorMessage="กรุณาเลือก"
                            :options="after_drive_list_reason"
                        />
                    </div>
                </div>
                <!--=================================================================-->
                <div class="py-2 px-6">
                    <div class="form-title">สนใจข้อเสนอรูปแบบใด (สินเชื่อเช่าซื้อ)</div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.offer"
                            placeholder="สนใจข้อเสนอรูปแบบใด (สินเชื่อเช่าซื้อ)*"
                            :error="formDirty && !formData.offer"
                            errorMessage="กรุณาเลือกข้อเสนอ"
                            :options="offer_list"
                        />
                    </div>
                </div>
                <!--=================================================================-->
                <div class="py-2 px-6">
                    <div class="form-title">ข้อเสนออื่นๆ</div>
                    <div class="form-group">
                        <base-select-option
                            v-model="formData.other_offer"
                            placeholder="ข้อเสนออื่นๆ*"
                            :error="formDirty && !formData.other_offer"
                            errorMessage="กรุณาเลือกข้อเสนออื่นๆ"
                            :options="other_offer_list"
                        />
                    </div>
                </div>
            </template>
            <template v-slot:footer>
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
                sex: '',
                age: '',
                status: '',
                child_amt: '',
                family_member_amt: '',
                educate: '',
                career: '',
                career_optional: '',
                monthly_income: '',
                buying_purpose: '',
                satisfaction_rate_1: '',
                satisfaction_rate_2: '',
                satisfaction_rate_3: '',
                after_drive_test: '',
                after_drive_test_reason: '',
                offer: '',
                other_offer: '',
                // line_user_id: userProfile.userId,
            },
            age_list: ['18 - 25 ปี', '26 - 35 ปี', '36 - 45 ปี', '46 - 55 ปี', '56 - 65 ปี', '66 ปีขึ้นไป'],
            educate_list: ['ต่ำกว่าปริญญาตรี', 'ปริญญาตรีหรือเทียบเท่า', 'สูงกว่าปริญญาตรี'],
            career_list: ['รับราชการ/รัฐวิสาหกิจ', 'บริษัทเอกชน', 'ธุรกิจส่วนตัว', 'เกษียณ รับบำนาญ', 'อื่นๆ'],
            monthly_income_list: [
                'น้อยกว่า 20,000 บาท',
                '20,000 - 40,000 บาท',
                '40,001 - 60,000 บาท',
                '60,001 - 80,000 บาท',
                '80,001 - 100,000 บาท',
                'มากกว่า 100,000 บาท',
            ],
            purpose_list: ['รถคันแรก', 'ต้องการซื้อเพิ่มเติม', 'ต้องการซื้อเพื่อทดแทน'],
            satisfaction_rate: [
                {
                    label: '5 = พึงพอใจมากที่สุด',
                    value: '5',
                },
                {
                    label: '4 = พึงพอใจมาก',
                    value: '4',
                },
                {
                    label: '3 = พึงพอใจปานกลาง',
                    value: '3',
                },
                {
                    label: '2 = พึงพอใจน้อย',
                    value: '2',
                },
                {
                    label: '1 = พึงพอใจน้อยที่สุด',
                    value: '1',
                },
            ],
            after_drive_list: [
                'ขอใบเสนอราคา',
                'ยังอยู่ในช่วงติดสินใจ แต่ตั้งใจจะทำการจองรถภายใน 1-3 เดือน',
                'ยังอยู่ในช่วงติดสินใจ แต่ตั้งใจจะทำการจองรถภายใน 3-6 เดือน',
                'ทำการจอง',
                'อื่นๆ',
                'ไม่ได้ทำอะไรต่อ / ไม่ได้จองรถ',
            ],
            after_drive_list_reason: [
                'ราคารถ',
                'โปรโมชั่น',
                'บริการหลังการขาย',
                'ดีไซน์ภายนอก ภายใน',
                'ฟังก์ชั่นและสมรรถนะ',
                'การเงิน',
                'เปรียบเทียบแบรนอื่นๆ',
                'อื่นๆ',
            ],
            offer_list: ['อัตราดอกเบี้ยพิเศษ', 'ดาวน์ต่ำ', 'ผ่อนนาน', 'อื่นๆ'],
            other_offer_list: [
                'ของแถม (ชุดแต่ง,ออฟชั่นเสริม)',
                'ฟรีประกันภัยชั้น 1',
                'ฟรี การขยายเวลารับประกันคุณภาพรถ',
                'เพิ่มมูลค่ารถเก่าเพื่อซื้อรถใหม่',
                'ฟรี ค่าบำรุงรักษา',
            ],
        };
    },
    mounted() {
        document.title = 'ลงทะเบียน Form 3';
        this.display = true;
        this.loading = false;

        //check register
    },
    methods: {
        async onSubmit() {
            this.formDirty = true;
            if (
                this.formData.first_name === '' ||
                this.formData.last_name === '' ||
                this.formData.mobile === '' ||
                this.formData.sex === '' ||
                this.formData.age === '' ||
                this.formData.status === '' ||
                this.formData.child_amt === '' ||
                this.formData.family_member_amt === '' ||
                this.formData.educate === '' ||
                this.formData.career === '' ||
                (this.formData.career === 'อื่นๆ' && this.formData.career_optional === '') ||
                this.formData.monthly_income === '' ||
                this.formData.buying_purpose === '' ||
                this.formData.satisfaction_rate_1 === '' ||
                this.formData.satisfaction_rate_2 === '' ||
                this.formData.satisfaction_rate_3 === '' ||
                this.formData.after_drive_test === '' ||
                (this.formData.after_drive_test === 'ไม่ได้ทำอะไรต่อ / ไม่ได้จองรถ' &&
                    this.formData.after_drive_test_reason === '') ||
                this.formData.offer === '' ||
                this.formData.other_offer === ''
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

.label-title {
    font-weight: bold;
}
</style>
