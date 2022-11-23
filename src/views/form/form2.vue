<template>
    <loading v-if="!display" color="#FFD100" />
    <layout v-else>
        <loading v-if="loading" color="#FFD100" :class="btnLoading === true ? 'loadingBackground' : ''" />
        <base-card :shadow="false" :cardFull="true">
            <template v-slot:header>
                <div class="titel-page">Form 2<br /></div>
            </template>
            <template v-slot:body>
                <div class="py-2 px-6" v-if="pageType === 'Topic'">
                    <div class="form-title">BigMotorSaleQuiz</div>
                    <div class="d-flex justify-center align-center pa-2" v-for="(item, index) in questions" :key="index">
                        <base-button @onClick="onClickTopic(item.topic, item.questions, index)" :label="item.topic" shadow />
                    </div>
                </div>

                <div class="py-0 px-6" v-if="pageType === 'Question'">
                    <div class="" v-if="question_current_position < 3">
                        <div class="form-title">
                            {{
                                questionsData[question_current_position][`question_${question_current_position + 1}`]
                                    .question_title
                            }}
                        </div>
                        <v-radio-group
                            v-model="radio_seleced"
                            column
                            hide-details
                            class="mb-2"
                            :error="formDirty && radio_seleced === null"
                        >
                            <v-radio
                                v-for="(item, index) in question_choice"
                                :key="index"
                                :label="item.value"
                                :value="item"
                                :error="formDirty && radio_seleced === null"
                            ></v-radio>
                        </v-radio-group>
                    </div>

                    <div v-if="question_current_position === 3">
                        <div class="mt-8" v-for="(item, index) in question_choice" :key="index">
                            <div class="form-title">
                                {{ item[`question_${4 + index}`].question_title }}
                            </div>
                            <v-radio-group
                                v-model="$data[`answer.question_${4 + index}`]"
                                column
                                hide-details
                                class="mt-0 mb-2"
                                :error="formDirty && radio_seleced === null"
                            >
                                <v-radio
                                    v-for="(item, index) in item[`question_${4 + index}`].answer"
                                    :key="index"
                                    :label="item.value"
                                    :value="item.value"
                                    :error="formDirty && radio_seleced === null"
                                ></v-radio>
                            </v-radio-group>
                        </div>
                    </div>
                </div>
                <!-- <div class="px-6">
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
                </div> -->
            </template>
            <template v-slot:footer>
                <div class="d-flex justify-center align-center pa-6" v-if="pageType === 'Question'">
                    <base-button @onClick="onClickNext" shadow :label="btn_text" />
                </div>
            </template>
        </base-card>
    </layout>
</template>

<script>
import { questions } from '@/utility/questions';
// import { checkRegister, checkSubmitted, form3 } from '@/apis/api';

export default {
    data() {
        const userProfile = $cookies.get('LINE_LIFF_DATA');
        return {
            userProfile,
            questions,
            questionsData: [],
            question_current_position: 0,
            question_length: 0,
            question_choice: [],
            answer: {
                topic: '',
                question_1: '',
                question_2: '',
                question_3: '',
                question_4: null,
                question_5: null,
                question_6: null,
            },

            radio_seleced: null,

            display: false,
            loading: true,
            btnLoading: false,
            btn_text: 'ถัดไป',
            radio_validate: false,
            formDirty: false,
            pageType: 'Topic',
        };
    },
    mounted() {
        document.title = 'Form 2';
        // this.checkRegister();
        // this.checkSubmitted();
        // check submitted
        this.display = true;
        this.loading = false;
    },
    methods: {
        async onSubmit() {
            this.formDirty = true;
            // await form3({
            //     formData: this.formData,
            //     cbSuccess: (res) => {
            //         if (res.status === 200) {
            //             this.btnLoading = false;
            //             this.loading = false;
            //             this.$router.push('/form-3-success');
            //         }
            //     },
            //     cbError: (e, msg) => {
            //         this.btnLoading = false;
            //         this.loading = false;
            //         this.$toast.error('ระบบขัดข้อง');
            //     },
            // });
        },
        async checkRegister() {
            await checkRegister({
                line_user_id: this.userProfile.userId,
                cbSuccess: (res) => {
                    if (res.status === 200 && res.data === null) {
                        return this.$router.push('/register');
                    }
                    this.display = true;
                    this.loading = false;
                },
                cbError: (e, msg) => {
                    this.btnLoading = false;
                    this.loading = false;
                    this.$toast.error('ระบบขัดข้อง');
                },
            });
        },
        async checkSubmitted() {
            await checkSubmitted({
                line_user_id: this.userProfile.userId,
                cbSuccess: (res) => {
                    if (res.status === 200 && res.data !== null) {
                        this.$router.push('/form-3-success');
                    }
                },
                cbError: (e, msg) => {
                    this.btnLoading = false;
                    this.loading = false;
                    this.$toast.error('ระบบขัดข้อง');
                },
            });
        },
        onClickTopic(topic, value, index) {
            this.pageType = 'Question';
            this.questionsData = value;
            this.question_length = value.length;
            this.question_choice = this.questionsData[this.question_current_position][`question_${index + 1}`].answer;
            this.answer.topic = topic;
        },
        onClickNext() {
            this.formDirty = true;
            if (this.question_current_position < 3 && this.radio_seleced === null) {
                this.$toast.warning('กรุณาตอบคำถาม');
                return (this.radio_validate = true);
            }

            console.log(this.answer);

            if (!this.radio_seleced.check) {
                return this.$toast.error('เสียใจด้วย คุณตอบคำถามผิด');
            }
            this.$toast.success('ยินดีด้วย คุณตอบคำถามถูกต้อง');

            const foundedKey = Object.keys(this.answer).find((key) => key === `question_${this.question_current_position + 1}`);
            this.answer[foundedKey] = this.radio_seleced.value;
            this.question_current_position += 1;

            if (this.question_current_position < 3) {
                this.question_choice =
                    this.questionsData[this.question_current_position][`question_${this.question_current_position + 1}`].answer;
            }

            if (this.question_current_position >= 3) {
                this.question_choice = this.questionsData.slice(3);
                this.btn_text = 'บันทึก';
            }

            this.formDirty = false;
            this.radio_seleced = null;
            console.log(this.answer);
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
.error-radio {
    color: red;
}

.loadingBackground {
    background-color: rgba(0, 0, 0, 0.5);
}

.label-title {
    font-weight: bold;
}
</style>
