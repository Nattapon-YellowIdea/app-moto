import { service } from "./axios"

const request = async(instance , { cbSuccess , cbError }) => {
    try {
        const res = await instance
        if(res && res.status === 200 ) {
            cbSuccess(res)
        } else {
            cbError(res , "Error !")
        }
    } catch( e ) {
        cbError(null , e)
    }
}

export const registerFormAPI = ({ formData, cbSuccess , cbError }) => request(
    service.post(`/api/e-service/register`, formData) ,
    { cbSuccess , cbError }
)

export const loginAPI = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/login`, formData) ,
  { cbSuccess , cbError }
)

export const paymentAPI = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/payment`, formData) ,
  { cbSuccess , cbError }
)

export const addBa = ({ formData, cbSuccess , cbError }) => request(
    service.post(`/api/e-service/add-ba`, formData) ,
    { cbSuccess , cbError }
)
    
export const removeBa = ({ formData, cbSuccess , cbError }) => request(
    service.put(`/api/e-service/remove-ba`, formData) ,
    { cbSuccess , cbError }
)

export const baList = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/ba-list`, formData) ,
  { cbSuccess , cbError }
)
  
export const billList = ({ formData, cbSuccess , cbError }) => request(
    service.post(`/api/e-service/bill-list`, formData) ,
    { cbSuccess , cbError }
)

export const loginWithPhone = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/login-with-phone`, formData) ,
  { cbSuccess , cbError }
)

export const loginWithEmail = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/login-with-email`, formData) ,
  { cbSuccess , cbError }
)

export const getUserProfile = ({ formData, cbSuccess , cbError }) => request(
  service.get(`/api/e-service-external/users/profile`, formData) ,
  { cbSuccess , cbError }
)

export const updateUserProfile = ({ formData, cbSuccess , cbError }) => request(
  service.put(`/api/e-service-external/users/profile`, formData) ,
  { cbSuccess , cbError }
)

export const changePassword = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/change-password`, formData) ,
  { cbSuccess , cbError }
)

export const forgotPassword = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/forgot-password`, formData) ,
  { cbSuccess , cbError }
)

export const removeSocialLink = ({ formData, cbSuccess , cbError }) => request(
  service.put(`/api/e-service-external/users/social/del`, formData) ,
  { cbSuccess , cbError }
)

export const checkRegister = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/check-register`, formData) ,
  { cbSuccess , cbError }
)

export const requestMemberToken = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/request-member-token`, formData) ,
  { cbSuccess , cbError }
)

export const activateUser = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/activate-user`, formData) ,
  { cbSuccess , cbError }
)

export const getOtpRefCode = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/get-otp-ref`, formData) ,
  { cbSuccess , cbError }
)

export const requestOTP = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/request-otp`, formData) ,
  { cbSuccess , cbError }
)

export const confirmOTP = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/confirm-otp`, formData) ,
  { cbSuccess , cbError }
)

export const confirmOTPLogin = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/confirm-otp-login`, formData) ,
  { cbSuccess , cbError }
)

export const payBill = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/pay-bill`, formData) ,
  { cbSuccess , cbError }
)

export const payBillDetail = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/payment-billing-detail`, formData) ,
  { cbSuccess , cbError }
)

export const updatePayBillTransactionRef = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/update/transaction/paybill`, formData) ,
  { cbSuccess , cbError }
)

export const getTransactionPayBill = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/get-transaction-paybill`, formData) ,
  { cbSuccess , cbError }
)

export const checkFollow = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/check-follow`, formData) ,
  { cbSuccess , cbError }
)

export const getMemberProfile = ({ formData, cbSuccess , cbError }) => request(
  service.get(`/api/e-service/get-member-profile`, formData) ,
  { cbSuccess , cbError }
)

export const updateMemberProfile = ({ formData, cbSuccess , cbError }) => request(
  service.put(`/api/e-service/update-member-profile`, formData) ,
  { cbSuccess , cbError }
)

export const updateBillAlert = ({ formData, cbSuccess , cbError }) => request(
  service.put(`/api/e-service/update-bill-alert`, formData) ,
  { cbSuccess , cbError }
)

export const registerEBill = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/register-eBill`, formData) ,
  { cbSuccess , cbError }
)

export const updateEBill = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/update-eBill`, formData) ,
  { cbSuccess , cbError }
)

export const checkEBill = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/check-e-bill`, formData) ,
  { cbSuccess , cbError }
)

export const requestOtpBill = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/request-otp-bill`, formData) ,
  { cbSuccess , cbError }
)

export const getOtpBill = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/get-otp-bill`, formData) ,
  { cbSuccess , cbError }
)

export const confirmOtpBill = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/confirm-otp-bill`, formData) ,
  { cbSuccess , cbError }
)

export const updateMemberTier = ({ formData, cbSuccess , cbError }) => request(
  service.put(`/api/e-service/update-member-tier`, formData) ,
  { cbSuccess , cbError }
)

export const getBillAddress = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/get-bill-address`, formData) ,
  { cbSuccess , cbError }
)

export const updateBillAddress = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/update-bill-address`, formData) ,
  { cbSuccess , cbError }
)

export const updateBillEmail = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/update-bill-email`, formData) ,
  { cbSuccess , cbError }
)

export const updateBillPhone = ({ formData, cbSuccess , cbError }) => request(
  service.post(`/api/e-service/update-bill-phone`, formData) ,
  { cbSuccess , cbError }
)