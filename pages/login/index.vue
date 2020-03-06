<template>
  <AuthScreen>
    <div class="login">
      <div>
        <div class="text-center">
          <img src="@/assets/title.png" alt="title">
        </div>
        <span class="text-purple d-block text-center">Welcome</span>
        <h4 class="text-center">
          Sign into your account
        </h4>
        <b v-if="errors && typeof errors === 'string'" class="text-center w-100 d-block mx-0 mt-2">{{ errors }}</b>
        <form @submit.prevent="login">
          <label for="email">
            Email
          </label>
          <input
            v-model="email"
            placeholder="Enter Your Email"
            type="text"
            class="default-input"
            name="email"
          >
          <template v-if="errors && errors.email">
            <b v-for="err in errors.email" :key="err" class="d-block">
              {{ err }}
            </b>
          </template>
          <label for="password">Password</label>
          <div class="form__password">
            <span><i
              class="fas fa-eye"
              @click="toggleShowPassword"
            /></span>

            <input
              ref="password"
              v-model="password"
              placeholder="Enter Your Password"
              type="password"
              class="default-input"
              name="password"
            >
            <template v-if="errors && errors.password">
              <b v-for="err in errors.password" :key="err" class="d-block">
                {{ err }}
              </b>
            </template>
          </div>
          <div class="d-flex align-center justify-space-between login__options">
            <v-checkbox
              v-model="remember"
              label="Remember Me"
            />
            <nuxt-link to="/forgot">
              Forgot Password?
            </nuxt-link>
          </div>
          <button :class="loading ? 'button--disabled' : 'button--purple'" class="button w-100 mt-5">
            Sign In
          </button>
          <span v-if="loading">Logging you in...</span>
        </form>
        <span class="mt-10">Don't have an acount? <nuxt-link
          class="ml-4"
          to="/register"
        >Sign up</nuxt-link></span>
      </div>
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
  middleware: 'guest',
  data () {
    return {
      email: '',
      password: '',
      remember: false,
      loading: false,
      showPass: false,
      errors: null
    }
  },
  methods: {
    login () {
      this.loading = true
      this.errors = null
      this.$axios.post('/users/login',
        {
          email: this.email,
          password: this.password
        }
      )
        .then(({ data }) => {
          console.log(data)
          this.loading = false
          this.$store.commit('auth/setUser', data.user)
          // localStorage.setItem('auth_token', data.token)
          this.$cookiz.set('auth-token', data.token)
          this.$router.push('/')
        })
        .catch((err) => {
          if (err.response.status === 422) {
            console.log(err.response.data)
            this.errors = err.response.data.errors
          }
          if (err.response.status === 401) {
            this.errors = err.response.data
            console.log(err.response.data)
          }
          this.loading = false
        })
    },
    toggleShowPassword () {
      this.showPass = !this.showPass
      if (this.showPass) {
        this.$refs.password.type = 'text'
      } else {
        this.$refs.password.type = 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles/';
.login {
  display: flex;
  height: 100%;
  align-items: center;
  width: 300px;
}
input {
  margin-top: 5px;
  margin-bottom: 10px;
  width: 280px;
}
.login__options {
    height: 35px;
}
img {
    width: 130px;
}
</style>
