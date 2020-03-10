<template>
  <AuthScreen>
    <div class="register">
      <div class="text-center">
        <img src="@/assets/title.png" alt="title">
      </div>
      <span class="text-purple d-block text-center">Welcome</span>
      <h4 class="text-center">
        Sign up for your account {{ $store.state.auth.loading }}
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
              label="First Name"
              error-property="name"
              :server-errors="serverErrors"
            />
            <ValidationBox v-if="submitted" :message="errors[0]" />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <ValidationInput
              v-model="lastname"
              placeholder="Enter Your Last Name"
              input-type="text"
              name="lastname"
              label="Last Name"
              error-property="name"
              :server-errors="serverErrors"
            />
            <ValidationBox v-if="submitted" :message="errors[0]" />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="email|required">
            <ValidationInput
              v-model="email"
              placeholder="Enter Your Email"
              input-type="email"
              name="email"
              label="Email"
              error-property="email"
              :server-errors="serverErrors"
            />
            <ValidationBox v-if="submitted" :message="errors[0]" />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required|phone">
            <ValidationInput
              v-model="number"
              placeholder="Enter Your Phone Number"
              input-type="tel"
              name="phonenumber"
              label="Phone Number"
              error-property="number"
              :server-errors="serverErrors"
            />
            <ValidationBox v-if="submitted" :message="errors[0]" />
          </ValidationProvider>
          <label for="number">
            Phone Number
          </label>
          <input
            v-model="number"
            class="default-input"
            type="tel"
            placeholder="Enter Phone Number"
          >
          <label for="password">Password</label>
          <div class="form__password">
            <span><i class="fas fa-eye" @click="toggleShowPassword" /></span>

            <input
              ref="password"
              v-model="password"
              placeholder="Enter Your Password"
              type="password"
              class="default-input"
              name="password"
            >
          </div>
          <label for="password_confirm">
            Password Confirmation
          </label>
          <div class="form__password">
            <span><i class="fas fa-eye" @click="toggleShowPassword" /></span>
            <input
              ref="passwordConfirm"
              v-model="passwordConfirmation"
              placeholder="Confirm Your Password"
              type="password"
              class="default-input"
              name="password-confirm"
            >
          </div>
          <label for="company">Company</label>
          <input
            v-model="company"
            placeholder="Enter Company Name"
            name="company"
            class="default-input"
            type="text"
          >

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
      this.$store.dispatch('auth/register', this.batch)
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
}

img {
    width: 130px;
}

</style>
