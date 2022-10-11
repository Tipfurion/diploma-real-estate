import parsePhoneNumber from 'libphonenumber-js'
import db from '../../db/db'
const validate = { email, password, phone }
function email(email: string) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}
function password(password: string) {
    return password.length >= 6 && password.length <= 128
}
function phone(phone: string) {
    const phoneNumber = parsePhoneNumber(phone, 'RU')
    if (!phoneNumber) {
        return false
    }
    return phoneNumber.isValid()
}
export default validate
