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
        <div class="register__password">
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
        <div class="register__password">
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

        <button :class="loading ? 'button--disabled' : 'button--purple'" class="button w-100">
          Sign Up
        </button>
        <span v-if="loading">Registering your account...</span>
      </form>
      <span class="mt-10">Already have an account? <nuxt-link
        class="ml-4"
        to="/login"
      >Sign in</nuxt-link></span>
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
      errors: null,
      showPass: false,
      loading: false
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
    addUser () {
      this.loading = true
      // return
      this.$axios
        .post('/users', this.batch, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(({ data }) => {
          console.log(data)
          alert(`You've been registed ezl, go to http://star-rating.netlify.com/${data.id} to see your user and go to /profile to edit your profile!`)
          this.loading = false
        })
        .catch((err) => {
          console.log(err.response)
          alert('errors! check console for now!')
          this.errors = err.response.data
          this.loading = false
        })
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
input {
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
}
.register {
  width: 300px;
}
.register__password {
  position: relative;
  span {
    position: absolute;
    top: 20%;
    right: 3%;
  }
  i {
    opacity: 0.85;
    transition: opacity 0.25s;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
