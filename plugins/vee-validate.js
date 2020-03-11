import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'

extend('required', {
  ...rules.required,
  message: 'This field is required'
})

extend('alpha', {
  ...rules.alpha,
  message: 'This field must only contain alphabetic characters'
})
extend('email', {
  ...rules.email,
  message: 'Please enter a valid email.'
})
extend('min', {
  ...rules.min,
  message: 'This field must be 8 characters'
})

const phone = {
  getMessage (field) {
    return `The ${field} must be a valid phone number`
  },
  validate (value) {
    const PhoneNumber = require('awesome-phonenumber')
    const pn = new PhoneNumber(value)
    const otherFormat = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
    const isPhone = otherFormat.test(value)
    // Check for either of these to return true
    return pn.isValid() || isPhone
  }
}
extend('phone', phone)
