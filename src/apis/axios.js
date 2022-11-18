import axios from "axios"

export const service = axios.create({
    baseURL : process.env.VUE_APP_API_END_POINT,
    // timeout : 30000
})

service.interceptors.request.use(
    config => {
        const userProfile = $cookies.get("LINE_LIFF_DATA")
        const userProfileData = $cookies.get("USER_PROFILE")
        if (userProfile) {
            config.headers.Authorization = `Bearer ${userProfile.line_liff_token}`
        }
        if (userProfileData) {
            config.headers['x-service-access'] = userProfileData.serviceAccess
        }
        return config
    } ,
    error => {
        return Promise.reject(error)
    }
)
