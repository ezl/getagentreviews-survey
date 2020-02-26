<template>
  <AuthScreen>
    <div class="register">
      <h4 class="text-center">
        Agent Reviews
      </h4>
      <span class="text-purple d-block text-center">Welcome</span>
      <h4 class="text-center">
        Sign up for your account
      </h4>
      <form
        enctype="multipart/form-data"
        @submit.prevent="addUser"
      >
        <div v-if="errors && errors.errors.name">
          <span
            v-for="(err, i) in errors.errors.name"
            :key="i"
          >{{ err }}</span>
        </div>
        <label for="firstname">
          First Name
        </label>
        <input
          v-model="firstname"
          placeholder="Enter First Name"
          type="text"
          class="default-input"
          name="firstname"
        >
        <label for="lastname">
          Last Name
        </label>
        <input
          v-model="lastname"
          placeholder="Enter Last Name"
          type="text"
          class="default-input"
          name="lastname"
        >
        <label for="email">Email</label>
        <input
          v-model="email"
          placeholder="Enter Email"
          type="text"
          class="default-input"
          name="email"
        >
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
        <input
          ref="password"
          v-model="password"
          placeholder="Enter Your Password"
          type="password"
          class="default-input"
          name="password"
        >
        <label for="password_confirm">
          Password Confirmation
        </label>
        <input
          ref="passwordConfirm"
          v-model="passwordConfirmation"
          placeholder="Confirm Your Password"
          type="text"
          class="default-input"
          name="password-confirm"
        >
        <label for="company">Company</label>
        <input
          v-model="company"
          placeholder="Enter Company Name"
          name="company"
          class="default-input"
          type="text"
        >

        <button class="button button--purple w-100">
          Sign Up
        </button>
      </form>
      <span class="mt-10">Already have an account? <nuxt-link class="ml-4" to="/login">Sign in</nuxt-link></span>
    </div>
  </AuthScreen>
</template>

<script>
import AuthScreen from '~/components/auth/AuthScreen'
export default {
  components: {
    AuthScreen
  },
  layout: 'default',
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      number: '',
      company: '',
      password: '',
      passwordConfirmation: '',
      errors: null
    }
  },
  computed: {
    name () {
      return this.firstname + ' ' + this.lastname
    },
    batch () {
      const fd = new FormData()
      fd.append('name', this.name)
      fd.append('email', this.email)
      fd.append('phone_number', this.number)
      fd.append('description', this.description)
      fd.append('email_description', this.email_description)
      fd.append('password', this.password)
      fd.append('password_confirmation', this.passwordConfirmation)
      fd.append('company', this.company)
      return fd
    }
  },
  methods: {
    addUser () {
      // return
      this.$axios
        .post('/users', this.batch, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err.response)
          this.errors = err.response.data
        })
    }
  }
}
</script>

<style scoped>
input {
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
}
.register {
  width: 300px;
}
</style>
