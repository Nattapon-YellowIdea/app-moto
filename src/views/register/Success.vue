<template>
    <loading v-if="!display" color="#FFD100"/>
    <layout v-else>
        <loading v-if="loading" color="#FFD100"/>
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">ลงทะเบียนสำเร็จ</div>
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
        this.display = true
        this.loading = false
    },
    methods: {
        onSubmit() {
            liff.closeWindow()
        }
    },
}
</script>