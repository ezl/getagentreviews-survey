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
extend('min:8', {
  ...rules.min,
  message: 'This field must be 8 characters'
})
