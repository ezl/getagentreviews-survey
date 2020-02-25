<template>
  <AuthScreen>
    <form enctype="multipart/form-data" @submit.prevent="addUser">
      <div v-if="errors && errors.errors.name">
        <span v-for="(err, i) in errors.errors.name" :key="i">{{ err }}</span>
      </div>
      <input
        v-model="firstname"
        placeholder="Enter First Name"
        type="text"
        class="default-input"
        name="firstname"
      >
      <input
        v-model="lastname"
        placeholder="Enter Last Name"
        type="text"
        class="default-input"
        name="lastname"
      >
      <input
        v-model="email"
        placeholder="Enter Email"
        type="text"
        class="default-input"
        name="email"
      >
      <input
        v-model="number"
        class="default-input"
        type="tel"
        placeholder="Enter Phone Number"
      >
      <input
        ref="password"
        v-model="password"
        placeholder="Enter Your Password"
        type="password"
        class="default-input"
        name="password"
      >
      <input
        ref="passwordConfirm"
        v-model="passwordConfirmation"
        placeholder="Confirm Your Password"
        type="text"
        class="default-input"
        name="password-confirm"
      >
      <input
        v-model="company"
        placeholder="Enter Company Name"
        name="company"
        class="default-input"
        type="text"
      >

      <button class="button button--success">
        Submit
      </button>
    </form>
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
      fd.append('phone_number', number)
      fd.append('description', this.description)
      fd.append('email_description', this.email_description)
      fd.append('password', this.password)
      fd.append('password_confirmation', this.passwordConfirmation)
      fd.append('company', this.company)
      return fd
    }
  },
  mounted () {
    const json = {
      data: [
        {
          google: 'link'
        },
        {
          yelp: 'link'
        }
      ]
    }
    this.$axios
      .post('/profile/1', {
        id: 1,
        links: JSON.stringify(json)
      })
      .then(({ data }) => {
        console.log(data)
      })
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

<style></style>
