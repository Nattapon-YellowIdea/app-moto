<template>
    <loading v-if="!display" color="#FFD100" />
    <layout v-else>
        <loading v-if="loading" color="#FFD100" :class="btnLoading === true ? 'loadingBackground' : ''" />
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">เจ้าหน้าที่ติดต่อกลับ<br />NT BROADBAND</div>
            </template>
            <template v-slot:body>
                <div class="py-2 px-6">
                    <div class="form-title">กรอกข้อมูลเพื่อให้เจ้าหน้าที่ติดต่อกลับ</div>
                    <div class="form-group">
                        <label>คำนำหน้าชื่อ*</label>
                        <base-select-option
                            v-model="formData.prefix"
                            placeholder="เลือกคำนำหน้าชื่อ"
                            :error="formDirty && !formData.prefix"
                            errorMessage="กรุณาเลือกคำนำหน้าชื่อ"
                            :options="prefixs"
                        />
                        <base-input
                            v-if="formData.prefix === 'อื่นๆ (โปรดระบุ)'"
                            v-model="formData.prefix_optional"
                            placeholder="กรอกคำนำหน้าชื่อ"
                            :error="formDirty && formData.prefix === 'อื่นๆ (โปรดระบุ)' && !formData.prefix_optional"
                            errorMessage="กรุณากรอกคำนำหน้าชื่อ"
                            class="mt-4"
                        />
                    </div>
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
                        <label>หมายเลขติดต่อกลับ*</label>
                        <base-input
                            v-model="formData.mobile"
                            placeholder="กรอกหมายเลขติดต่อกลับ"
                            :error="formDirty && formData.mobile.length < 9"
                            errorMessage="กรุณากรอกหมายเลขติดต่อกลับ"
                            type="tel"
                            maxlength="10"
                            @onKeypress="NumbersOnly"
                        />
                    </div>
                    <div class="form-group">
                        <label>วันที่ต้องการติดต่อกลับ*</label>
                        <BaseDatePicker
                            v-model="formData.date_install"
                            format="yyyy-mm-dd"
                            placeholder="วันที่ต้องการติดต่อกลับ"
                            ref="BaseDatePicker"
                            :formDirty="formDirty"
                            :min="getTomorow()"
                            :error="formDirty && !formData.date_install"
                            errorMessage="กรุณาเลือกวันที่ประมาณการติดตั้ง"
                        />
                    </div>
                    <div class="form-group select-time">
                        <div class="time-item-wrap">
                            <div
                                class="time-item"
                                :class="{
                                    'time-item-selected': selectedTime === 'morning',
                                    'time-item-error': formDirty && selectedTime === '',
                                }"
                                @click="selectedTime = 'morning'"
                                aria-readonly="true"
                                :error="true"
                            >
                                ช่วงเช้า
                            </div>
                        </div>
                        <div class="time-item-wrap">
                            <div
                                class="time-item"
                                :class="{
                                    'time-item-selected': selectedTime === 'afternoon',
                                    'time-item-error': formDirty && selectedTime === '',
                                }"
                                @click="selectedTime = 'afternoon'"
                            >
                                ช่วงบ่าย
                            </div>
                        </div>
                        <div class="message-error" v-if="formDirty && selectedTime === ''">กรุณาเลือกช่วงเวลาที่ประมาณการติดตั้ง</div>
                    </div>
                </div>
                <div class="py-2 px-6">
                    <div class="form-title">สถานที่ติดตั้ง</div>
                    <div class="form-group">
                        <label>บ้านเลขที่*</label>
                        <base-input
                            v-model="formData.no"
                            placeholder="กรอกบ้านเลขที่"
                            :error="formDirty && !formData.no"
                            errorMessage="กรุณากรอกบ้านเลขที่"
                        />
                    </div>
                    <div class="form-group">
                        <label>อาคาร/หมู่บ้าน</label>
                        <base-input
                            v-model="formData.village"
                            placeholder="กรอกอาคาร/หมู่บ้าน"
                        />
                    </div>
                    <div class="form-group">
                        <label>ถนน</label>
                        <base-input v-model="formData.road" placeholder="กรอกถนน" />
                    </div>
                    <div class="form-group">
                        <label>จังหวัด*</label>
                        <base-select-option
                            v-model="formData.province"
                            placeholder="เลือกจังหวัด"
                            :error="formDirty && !formData.province"
                            errorMessage="กรุณาเลือกจังหวัด"
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
                            v-model="formData.subdistrict"
                            placeholder="เลือกตำบล/แขวง"
                            :error="formDirty && !formData.subdistrict"
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
                            v-model="formData.zip_code"
                            placeholder="กรอกรหัสไปรษณีย์"
                            :error="formDirty && !formData.zip_code"
                            errorMessage="กรุณากรอกรหัสไปรษณีย์"
                        />
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="d-flex justify-center align-center pa-6">
                    <base-button
                        @onClick="onSubmit"
                        shadow
                        :label="btnLoading === true ? 'กำลังโหลด...' : 'ยืนยัน'"
                        :disabled="btnLoading === true ? true : false"
                    />
                </div>
            </template>
        </base-card>
        <Modal :visible="exampleModal">
            <v-card>
                <v-card-title> Google Map </v-card-title>
                <v-divider></v-divider>
                <div class="google-map" id="googleMap">
                    <template>
                        <GmapMap
                            :center="{ lat: 13.0003147, lng: 96.9931188 }"
                            :zoom="10"
                            map-type-id="roadmap"
                            ref="mapRef"
                            style="width: 100%; height: 350px"
                        >
                            <GmapMarker :key="1" :position="marker.position" @drag="handleMarkerDrag" :draggable="true" />
                        </GmapMap>
                    </template>
                    <v-divider></v-divider>
                    <div class="py-1 px-4 d-flex">
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2 white--text" color="#4caf50" @click="acceptLoaction"> Accept Your Location </v-btn>
                    </div>
                </div>
            </v-card>
        </Modal>
    </layout>
</template>

<script>
import { province, district, subDistrict } from '../../../utility/address';
import { LeadFormAPI, getDetailMasterRegisterService } from '@/apis/register-service';
import { checkEmojiAndSpecialChar, checkEmoji } from '@/utility/helper';

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
            formData: {
                prefix: '',
                prefix_optional: '',
                first_name: '',
                last_name: '',
                mobile: '',
                date_install: '',
                address: '',
                no: '',
                village: '',
                building: '',
                moo: '',
                soi: '',
                road: '',
                province: '',
                district: '',
                subdistrict: '',
                zip_code: '',
                promotion_id: '',
                speed_id: '',
                note: '',
                device_id: '',
                exchange_id: '',
                latitude: '',
                longitude: '',
                customer_province_id: '',
                customer_district_id: '',
                line_user_id: userProfile.userId,
            },
            prefixs: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ (โปรดระบุ)'],
            packageData: [],
            packageList: [],
            provinceOption: province,
            districtOption: district,
            subDistrictOption: subDistrict,
            userProfile,
            marker: { position: { lat: 0, lng: 0 } },
            center: { lat: 0, lng: 0 },
            selectedTime: '',
        };
    },
    watch: {
        'formData.first_name'(val) {
            this.formData.first_name = checkEmojiAndSpecialChar(val);
        },
        'formData.last_name'(val) {
            this.formData.last_name = checkEmojiAndSpecialChar(val);
        },
        'formData.prefix_optional'(val) {
            this.formData.prefix_optional = checkEmojiAndSpecialChar(val);
        },
        'formData.mobile'(val) {
            this.formData.mobile = checkEmojiAndSpecialChar(val);
        },

        'formData.no'(val) {
            this.formData.no = checkEmoji(val);
        },
        'formData.village'(val) {
            this.formData.village = checkEmojiAndSpecialChar(val);
        },
        'formData.road'(val) {
            this.formData.road = checkEmojiAndSpecialChar(val);
        },
        'formData.zip_code'(val) {
            this.formData.zip_code = checkEmojiAndSpecialChar(val);
        },
    },
    mounted() {
        document.title = 'เจ้าหน้าที่ติดต่อกลับ NT BROADBAND';

        gtag('config', process.env.VUE_APP_GTAG_CONFIG, {
            page_title: 'เจ้าหน้าที่ติดต่อกลับ NT BROADBAND',
        });

        if (this.$router.history.current.query.id) {
            this.onLoad(this.$router.history.current.query.id);
        }

        this.display = true;
        this.loading = false;

        this.exampleModal = true;
        this.getLocation();
    },
    methods: {
        async onLoad(id) {
            this.display = false;
            this.loading = true;

            await getDetailMasterRegisterService({
                id: id,
                cbSuccess: (res) => {
                    this.packageData = res.data.data;
                    this.packageList = this.packageData.map((itm) => ({
                        text: `${itm.detail.name} Mbps`,
                        value: itm.detail.offer_id,
                    }));
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
                this.formData.prefix === '' ||
                this.formData.first_name === '' ||
                this.formData.last_name === '' ||
                this.formData.mobile === '' ||
                this.formData.no === '' ||
                this.formData.province === '' ||
                this.formData.district === '' ||
                this.formData.subdistrict === '' ||
                this.formData.zip_code === '' ||
                this.formData.mobile.length < 9 ||
                this.selectedTime === '' ||
                this.formData.date_install === ''
            ) {
                this.$toast.warning('กรุณากรอกข้อมูลให้ครบ');
            } else {
                this.btnLoading = true;
                this.loading = true;
                let addressStr = ``, dateCombine;
                if (this.formData.no !== '' || this.formData.no !== '-') {
                    addressStr += this.formData.no;
                }
                if (this.formData.village !== '' || this.formData.village !== '-') {
                    addressStr += this.formData.village;
                }
                if (this.formData.building !== '' || this.formData.building !== '-') {
                    addressStr += this.formData.building;
                }

                if (this.selectedTime === 'morning') {
                    dateCombine = `${this.formData.date_install.substring(0, 10)} 10:00:00`;
                }
                if (this.selectedTime === 'afternoon') {
                    dateCombine = `${this.formData.date_install.substring(0, 10)} 13:00:00`;
                }

                this.formData.address = addressStr;
                this.formData.date_install = dateCombine;

                await LeadFormAPI({
                    formData: this.formData,
                    cbSuccess: (res) => {
                        if (res.status === 200) {
                            this.btnLoading = false;
                            this.loading = false;
                            this.$router.push('/register/broadband/contact/success');
                        }
                    },
                    cbError: (e, msg) => {
                        this.btnLoading = false;
                        this.loading = false;
                        this.$toast.error('ระบบขัดข้อง');
                    },
                });
            }
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
            this.formData.zip_code = zipcode;
        },
        onSelectPackage(offer_id) {
            let packageSelected = this.packageData.find((itm) => itm.detail.offer_id === offer_id);
            this.formData.promotion_id = packageSelected.detail.promotion_id;
            this.formData.speed_id = packageSelected.detail.speed_id;
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.marker.position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    this.panToMarker();
                });
            }
        },
        handleMarkerDrag(e) {
            this.marker.position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        },
        panToMarker() {
            if (this.$refs.mapRef) {
                this.$refs.mapRef.$mapPromise.then((map) => {
                    map.panTo(this.marker.position);
                    map.setZoom(15);
                });
            }
        },
        acceptLoaction() {
            if (this.marker.position.lat !== null && this.marker.position.lng) {
                this.formData.latitude = this.marker.position.lat.toString();
                this.formData.longitude = this.marker.position.lng.toString();
                this.exampleModal = false;
            }
        },
        getTomorow() {
            const today = new Date();
            const yyyy = today.getFullYear();
            let mm = today.getMonth() + 1; // Months start at 0!
            let dd = today.getDate() + 1;

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            const todayString = yyyy + '-' + mm + '-' + dd;
            return todayString;
        },
        NumbersOnly(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
                evt.preventDefault();
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
