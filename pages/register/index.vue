<template>
  <AuthScreen>
    <div class="register">
      <div class="text-center">
        <img src="@/assets/title.png" alt="title">
      </div>
      <span class="text-purple d-block text-center">Welcome</span>
      <h4 class="text-center">
        Sign up for your account
      </h4>
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form
          enctype="multipart/form-data"
          @submit.prevent="handleSubmit(register)"
        >
          <ValidationProvider v-slot="{ errors }" rules="required">
            <ValidationInput
              v-model="firstname"
              placeholder="Enter Your First Name"
              input-type="text"
              name="firstname"
              label="First Name*"
              error-property="name"
              :server-errors="serverErrors"
            />
            <ValidationBox :message="errors[0]" />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <ValidationInput
              v-model="lastname"
              placeholder="Enter Your Last Name"
              input-type="text"
              name="lastname"
              label="Last Name*"
              error-property="name"
              :server-errors="serverErrors"
            />
            <ValidationBox :message="errors[0]" />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="email|required">
            <ValidationInput
              v-model="email"
              placeholder="Enter Your Email"
              input-type="email"
              name="email"
              label="Email*"
              error-property="email"
              :server-errors="serverErrors"
            />
            <ValidationBox :message="errors[0]" />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required|phone">
            <ValidationInput
              v-model="number"
              placeholder="Ex. +13198832832"
              input-type="tel"
              name="phonenumber"
              label="Phone Number*"
              error-property="number"
              :server-errors="serverErrors"
            />
            <ValidationBox :message="errors.length ? 'Enter a valid phone number' : ''" />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required|min:8">
            <ValidationInput
              v-model="password"
              placeholder="Password(8 Characters Min.)"
              input-type="password"
              name="password"
              label="Password*"
              error-property="password"
              :server-errors="serverErrors"
            />
            <ValidationBox :message="errors[0]" />
          </ValidationProvider>
          <!-- <ValidationProvider v-slot="{ errors }" rules="required|min:8">
            <ValidationInput
              v-model="passwordConfirmation"
              placeholder="Confirm Your Password"
              input-type="password"
              name="password-confirm"
              label="Password Confirmation*"
              error-property="password"
              :server-errors="serverErrors"
            />
            <ValidationBox v-if="submitted" :message="errors[0]" />
          </ValidationProvider> -->
          <ValidationInput
            v-model="company"
            placeholder="Enter Company Name"
            input-type="text"
            name="company"
            label="Company"
            error-property="company"
            :server-errors="serverErrors"
          />
          <button :class="loading || invalid ? 'button--disabled' : 'button--purple'" class="button w-100">
            Sign Up
          </button>
          <span v-if="loading">Registering your account...</span>
        </form>
      </ValidationObserver>
      <span class="mt-10">Already have an account? <nuxt-link
        class="ml-4"
        to="/login"
      >Sign in</nuxt-link></span>
    </div>
  </AuthScreen>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import AuthScreen from '~/components/auth/AuthScreen'
import ValidationBox from '~/components/misc/ValidationBox'
import ValidationInput from '~/components/common/ValidationInput'
export default {
  components: {
    AuthScreen,
    ValidationProvider,
    ValidationBox,
    ValidationObserver,
    ValidationInput
  },
  layout: 'default',
  middleware: 'guest',
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      number: '',
      company: '',
      password: '',
      passwordConfirmation: '',
      showPass: false,
      submitted: false
    }
  },
  computed: {
    name () {
      return this.firstname + ' ' + this.lastname
    },
    loading () {
      return this.$store.state.auth.loading
    },
    serverErrors () {
      return this.$store.state.auth.serverErrors
    },
    batch () {
      const fd = new FormData()
      fd.append('name', this.name)
      fd.append('email', this.email)
      fd.append('number', this.number)
      fd.append('description', this.description)
      fd.append('email_description', this.email_description)
      fd.append('password', this.password)
      fd.append('password_confirmation', this.passwordConfirmation)
      fd.append('company', this.company)
      return fd
    }
  },
  methods: {
    register () {
      this.submitted = true
      this.$store.dispatch('auth/register', { batch: this.batch, user: { email: this.email, password: this.password } })
    },
    toggleShowPassword () {
      this.showPass = !this.showPass
      if (this.showPass) {
        this.$refs.password.type = 'text'
        this.$refs.passwordConfirm.type = 'text'
      } else {
        this.$refs.password.type = 'password'
        this.$refs.passwordConfirm.type = 'password'
      }
    }
  },
  head () {
    return {
      title: 'Register'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles/';
input {
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
}
.register {
  width: 300px;
.form__password {
  .fas.fa-eye {
    right: 8% !important;
  }
}
}

img {
    width: 130px;
}

</style>
