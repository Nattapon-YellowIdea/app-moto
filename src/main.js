import Vue from 'vue'
import queryString from 'query-string'
import VueCookies from 'vue-cookies'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import vuetify from '@/plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import * as VueGoogleMaps from 'vue2-google-maps';

import App from './App.vue'
import router from './router'
import store from './store'
import ComponentRegistration from "./utility/components-registration"
// import { checkRegister } from './apis/api'

import "@/styles/index.css"

console.log("version test 001");

const optionsToast = {
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
}

Vue.config.productionTip = false
ComponentRegistration(Vue)
library.add(faChevronLeft, faAngleRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueCookies)
Vue.use(Toast, optionsToast)
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
        region: 'TH',
        language: 'th',
    },
})

let vh = window.innerHeight * 0.01
document.documentElement.style.setProperty('--vh', `${vh}px`)

async function runner() {
    const userData = $cookies.get("LINE_LIFF_DATA")

    // if (userData) {
    //     checkRegister({
    //         formData: {
    //             line_user_id: userData.userId
    //         },
    //         cbSuccess: res => {
    //             $cookies.set('USER_PROFILE', JSON.stringify(res.data.data))
                new Vue({
                    router,
                    store,
                    vuetify,
                    render: h => h(App),
                }).$mount('#app')
    //         },
    //         cbError: (e, msg) => { }
    //     })
    // }
}

function lineLogin(liff_id) {
    if (window.location.hostname === "localhost") {
        const userData = {
            userId: "U663bafb6731ac47584df8105fbd2f33d",
            email: 'aewtippawanm@gmail.com',
            displayName: 'เรียกหนูว่าอิ๋ว🐹',
            pictureUrl: 'https://profile.line-scdn.net/0hMuLc4MS6ElpxGjiRORJtDU1fHDcGNBQSCXsKbwQeRGNfK1JeSnRebAFIHGtVfwIPSikNP1JNTGNa',
            line_liff_token: 'eyJraWQiOiIwZjdhYzBmOGEyMmUxMzFiNWZlNzVhOWNlMTY5OWFjYTE1MGY3ZjZjMGVkNzVlMjgyYjNiZjdmYjA5N2E3NjNlIiwidHlwIjoiSldUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2FjY2Vzcy5saW5lLm1lIiwic3ViIjoiVTYwNzk1NjFjNTA3MDU2MGY1YTUxZTg1Y2QzNjU1NDQ2IiwiYXVkIjoiMTU5NjEyMjc1MSIsImV4cCI6MTY1MDQyNjU1MywiaWF0IjoxNjUwNDIyOTUzLCJhbXIiOlsibGluZXNzbyJdLCJuYW1lIjoi4LmA4Lij4Li14Lii4LiB4Lir4LiZ4Li54Lin4LmI4Liy4Lit4Li04LmL4Lin8J-QuSIsInBpY3R1cmUiOiJodHRwczovL3Byb2ZpbGUubGluZS1zY2RuLm5ldC8waE11TGNFNFBNRWxweEdnWEcyMEp0RFUxZkhEY0dOQlFTQ1hzS2J3UWVSR05mSzFKZVNuUmViQUZJSEd0VmZ3SVBTaWtOUDFKTlRHTmEifQ.rEaQG3m5Vl-pYbNj0UsA4y753F8W45RcTlIUmnTnqjfs117tI_45k_r9bi-SGZy8DUsYckElJmbfdf3B_9xnjw'
        }
        $cookies.set('LINE_LIFF_DATA', JSON.stringify(userData))
        runner();
    }
    else {
        const path = location.href.split(location.origin)
        const path2 = path[1].split("/?liff.state=")
        if (decodeURIComponent(path2[1]) !== undefined && decodeURIComponent(path2[1]) !== null && decodeURIComponent(path2[1]) !== "undefined" && decodeURIComponent(path2[1]) !== "null") {
            $cookies.set('LINE_LIFF_ORIGIN_PATH_NT', decodeURIComponent(path2[1]))
        }

        const userData = $cookies.get("LINE_LIFF_DATA")
        if (!userData) {
            liff.init({ liffId: liff_id })
                .then(async () => {
                    if (liff.isLoggedIn()) {
                        const profile = await liff.getProfile()
                        profile.line_liff_token = liff.getIDToken()
                        $cookies.set('LINE_LIFF_DATA', JSON.stringify(profile), "3h")
                        runner();
                    } else {
                        liff.login()
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            if (window.location.href.search("liff.state") > -1) {
                const qsParse = queryString.parse(decodeURIComponent(window.location.search));
                console.log('qsParse', qsParse)

                if (qsParse.reason_no) {
                    window.location = `${qsParse["liff.state"]}&reason_no=${qsParse.reason_no}`;
                } else if (qsParse.transactionRef) {
                    window.location = `${qsParse["liff.state"]}&transactionRef=${qsParse.transactionRef}`;
                } else {
                    window.location = `${qsParse["liff.state"]}`;
                }
                runner();
            }
            else {
                runner();
            }
        }
    }
}

console.log('window.location.pathname',  window.location.pathname)

lineLogin(process.env.VUE_APP_LINE_LIFF_ID_100)

// if (window.location.pathname === '/register/appointment') {
//     lineLogin(process.env.VUE_APP_LINE_LIFF_ID_80)
// }
// else {
//     lineLogin(process.env.VUE_APP_LINE_LIFF_ID_100)
// }