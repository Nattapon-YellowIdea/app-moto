import { service } from "./axios"

const request = async (instance, { cbSuccess, cbError }) => {
    try {
        const res = await instance
        if (res && res.status === 200) {
            cbSuccess(res)
        } else {
            cbError(res, "Error !")
        }
    } catch (e) {
        cbError(null, e)
    }
}

export const registerForm = ({ formData, cbSuccess, cbError }) => request(
    service.post(`/api/register-service/register`, formData),
    { cbSuccess, cbError }
)

export const checkRegister = ({ formData, cbSuccess, cbError }) => request(
    service.post(`/api/register-service/check-register`, formData),
    { cbSuccess, cbError }
)

export const form3 = ({ formData, cbSuccess, cbError }) => request(
    service.post(`/api/form-service/form-3`, formData),
    { cbSuccess, cbError }
)