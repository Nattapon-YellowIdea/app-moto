<template>
    <loading v-if="!display" color="#FFD100" />
    <layout v-else>
        <loading v-if="loading" color="#FFD100" />
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">แพ็กเกจที่ท่านสมัคร</div>
            </template>
            <template v-slot:body>
                <div class="pa-6">
                    <div class="package-wrap">
                        <div class="package-body">
                            <div class="d-flex mb-1">
                                <div class="package-label-bold">หมายเลขอ้างอิง</div>
                                <div class="package-value">{{ formData.sr_code }}</div>
                            </div>
                            <div class="d-flex mb-1">
                                <div class="package-label">แพ็กเกจ</div>
                                <div class="package-value">{{ `${formData.package_name}` }}</div>
                            </div>
                            <div class="d-flex mb-1">
                                <div class="package-label">ความเร็ว</div>
                                <div class="package-value">{{ `${speedConverter(formData.package_speed)} Mbps` }}</div>
                            </div>
                            <div class="d-flex mb-1">
                                <div class="package-label">ค่าบริการ</div>
                                <div class="package-value">{{ `${numberComma(formData.package_price)} บาท` }}</div>
                            </div>
                            <div class="mt-2 mb-2" v-if="formData.summary > 0">
                                <hr />
                            </div>
                            <div class="d-flex mb-1" v-if="formData.package_onu > 0">
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
                        <div class="package-footer">
                            <div class="d-flex align-center justify-space-between">
                                <div class="font-weight-5">สรุปค่าติดตั้งอุปกรณ์</div>
                                <div class="font-weight-5 font-size-5 text-info">
                                    {{ `${numberCommaWithVAT(formData.summary)}` }}
                                    <span class="font-size-3 font-weight-2">บาท</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div class="text-center titel-page">{{ secondHeaderText }}</div>
                    <div class="d-flex justify-center mt-6 mb-6">
                        <img src="@/assets/icons/registerSuccess.svg" alt="registerSuccess" />
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="d-flex justify-center align-center pa-6">
                    <base-button :label="closeBtnText" @onClick="onSubmit" shadow />
                </div>
            </template>
        </base-card>
    </layout>
</template>

<script>
import { getDetailRegisterService } from '@/apis/register-service';

export default {
    data() {
        return {
            display: false,
            loading: true,
            formData: {
                package_name: '',
                package_speed: '',
                package_price: '',
                package_onu: '',
                sr_code: '',
                fee_cost: 0,
                over_cable_cost: 0,
                maintenence_cost: 0,
                setup_cost: 0,
                summary: 0,
            },
            closeBtnText: 'ปิดหน้าต่างนี้ เพื่อเลือกวันนัดหมาย',
            secondHeaderText: 'กรุณาเลือกวันนัดหมายติดตั้ง',
        };
    },
    mounted() {
        document.title = 'รายละเอียดการสมัครบริการ';

        if (this.$router.history.current.query.id) {
            this.onLoad(this.$router.history.current.query.id);
        }
    },
    methods: {
        onSubmit() {
            liff.closeWindow();
        },
        async onLoad(id) {
            await getDetailRegisterService({
                formData: {
                    id: id,
                },
                cbSuccess: (res) => {
                    const resData = res.data.data;
                    this.formData.package_name = resData.order_status_promotion_name;
                    this.formData.package_speed = resData.order_status_speed;
                    this.formData.package_price = this.numberComma(resData.promotion_price);
                    this.formData.package_onu = this.numberComma(resData.instrument_cost_ont);
                    this.formData.sr_code = resData.order_status_code;

                    this.formData.fee_cost = parseFloat(resData.order_status_cost_fee);
                    this.formData.over_cable_cost = parseFloat(resData.order_status_cost_over_cable);
                    this.formData.maintenence_cost = parseFloat(resData.order_status_cost_maintenance);
                    this.formData.setup_cost = parseFloat(resData.order_status_cost_setup);
                    this.formData.summary = parseFloat(
                        parseFloat(resData.order_status_cost_fee) +
                            parseFloat(resData.order_status_cost_over_cable) +
                            parseFloat(resData.order_status_cost_maintenance) +
                            parseFloat(resData.order_status_cost_setup) +
                            parseFloat(resData.instrument_cost_ont)
                    );

                    if (resData.order_status_status_id === '11') {
                        this.secondHeaderText = 'กรุณาชำระค่าติดตั้ง';
                        this.closeBtnText = 'ปิดหน้าต่างนี้ เพื่อชำระค่าติดตั้ง';
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
        numberComma(number) {
            if (!number) return 0;
            return number.toLocaleString(undefined, { minimumFractionDigits: 2 });
        },
        numberCommaWithVAT(number) {
            let vat = 7;
            if (!number) return 0;
            return ((parseFloat(number) * vat) / 100 + parseFloat(number)).toLocaleString(undefined, {
                minimumFractionDigits: 2,
            });
        },
        speedConverter(speedStr) {
            let realSpeed = '';
            if (!speedStr) return realSpeed;
            realSpeed = `${speedStr.split('/')[0] / 1024}/${speedStr.split('/')[1] / 1024}`;
            return realSpeed;
        },
    },
};
</script>

<style lang="scss">
.package-wrap {
    border: 1.5px solid #545859;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    background-color: #ffffff;
    overflow: hidden;
    & .package-label {
        width: 110px;
        font-size: 16px;
        font-weight: 400;
        color: #545859;
    }
    & .package-value {
        font-weight: 700;
        color: #222222;
        text-align: right;
        margin-left: auto;
        margin-right: 0;
    }
    & .package-label-bold {
        width: 110px;
        font-weight: 700;
        color: #222222;
    }
    & .package-body {
        padding: 16px;
        border-bottom: 1.5px solid #545859;
    }
    & .package-footer {
        height: 40px;
        padding: 0 16px;
        background-color: #ffd100;
    }
}
</style>
