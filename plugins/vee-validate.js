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
    // Custom regex for a phone number
    const MOBILEREG = /^((1[3578][0-9])+\d{8})$/

    // Check for either of these to return true
    return MOBILEREG.test(value)
  }
}
extend('phone', phone)
