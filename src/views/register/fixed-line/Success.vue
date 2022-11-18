<template>
    <loading v-if="!display" color="#FFD100"/>
    <layout v-else>
        <loading v-if="loading" color="#FFD100"/>
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">ขอบคุณที่ให้ความสนใจ NT<br/>กรุณารอการติดต่อกลับจากเจ้าหน้าที่</div>
            </template>
            <template v-slot:body>
                <div class="d-flex justify-center mt-16">
                    <img src="@/assets/icons/success.svg" alt="error">
                </div>
            </template>
            <template v-slot:footer>
                <div class="d-flex justify-center align-center pa-6">
                    <base-button
                        label="ปิดหน้าต่างนี้"
                        @onClick="onSubmit"
                        shadow
                    />
                </div>
            </template>
        </base-card>
    </layout>
</template>

<script>
export default {
    data() {
        return {
            display: false,
            loading: true,
        }
    },
    mounted() {
        setTimeout(() => {
            this.display = true
            this.loading = false
        }, 2000);
    },
    methods: {
        onSubmit() {
            liff.closeWindow()
        }
    },
}
</script>