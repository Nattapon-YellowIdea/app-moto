import BaseButton from '../components/base/BaseButton'
import BaseCard from '../components/base/BaseCard'
import BaseCheckBox from '../components/base/BaseCheckBox'
import BaseInput from '../components/base/BaseInput'
import BaseDivider from '../components/base/BaseDivider'
import BaseSelectOption from '../components/base/BaseSelectOption'
import BaseTextArea from '../components/base/BaseTextArea'
import BaseDatePicker from '../components/base/BaseDatePicker'
import Layout from "../components/custom/Layout"
import Loading from '../components/custom/Loading'
import OTP from '../components/general/OTPFormField'
import Modal from '../components/general/Modal'
import TermAndCondition from '../components/general/TermAndCondition.vue'

export default function(Vue) {
    Vue.component("BaseButton" , BaseButton)
    Vue.component("BaseCard" , BaseCard)
    Vue.component("BaseCheckBox" , BaseCheckBox)
    Vue.component("BaseSelectOption" , BaseSelectOption)
    Vue.component("BaseInput" , BaseInput)
    Vue.component("BaseDivider" , BaseDivider)
    Vue.component("BaseTextArea" , BaseTextArea)
    Vue.component("BaseDatePicker" , BaseDatePicker)
    Vue.component("Layout" , Layout)
    Vue.component("Loading" , Loading)
    Vue.component("OtpInput" , OTP)
    Vue.component("Modal" , Modal)
    Vue.component("TermAndCondition" , TermAndCondition)
}
