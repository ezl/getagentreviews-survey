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
        <div v-if="serverErrors && typeof serverErrors === 'string'" class="text-center">
          <ValidationBox :message="serverErrors" />
        </div>

        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="submitted = true, handleSubmit(login)">
            <ValidationProvider v-slot="{ errors }" rules="email|required">
              <ValidationInput 
              v-model="email" 
              placeholder="Enter Your Email" 
              input-type="email" 
              name="email" 
              label="Email" 
              error-property="email" 
              :serverErrors="serverErrors" />
              <ValidationBox v-if="submitted" :message="errors[0]" />
            </ValidationProvider>
            <label for="password">Password</label>
            <div class="form__password">
              <span><i
                class="fas fa-eye"
                @click="toggleShowPassword"
              /></span>
              <ValidationProvider v-slot="{ errors }" rules="required|min:8">
                <input
                  ref="password"
                  v-model="password"
                  placeholder="Enter Your Password"
                  type="password"
                  class="default-input"
                  name="password"
                >
                <ValidationBox :message="errors[0]" />
              </ValidationProvider>
              <template v-if="serverErrors && serverErrors.password">
                <div v-for="err in serverErrors.password" :key="err">
                  <ValidationBox :message="err" />
                </div>
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
        </ValidationObserver>
        <span class="mt-10">Don't have an acount? <nuxt-link
          class="ml-4"
          to="/register"
        >Sign up</nuxt-link></span>
      </div>
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
      email: '',
      password: '',
      remember: false,
      loading: false,
      showPass: false,
      serverErrors: '',
      submitted: false

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
            this.serverErrors = err.response.data.errors
          }
          if (err.response.status === 401) {
            this.serverErrors = err.response.data
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
