<template>
  <!-- to do -->
  <ValidationObserver ref="observer" v-slot="{ handleSubmit, invalid }">
    <ValidationBox v-if="message" :message="message.text" />
    <form @submit.prevent="handleSubmit(addClient)">
      <ValidationProvider v-slot="{ errors }" rules="email|required">
        <ValidationInput
          v-model="email"
          placeholder="Client Email"
          input-type="email"
          name="email"
          label="Email"
          :input-styles="inputStyling()"
          :input-classes="message && message.type === 'error' ? 'default-input--error' : ''"
          :focus="!email || message.type && message.type === 'error' ? true : false"
        />
        <ValidationBox width="250px" :message="errors[0]" />
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required">
        <ValidationInput
          v-model="name"
          placeholder="Client Name"
          input-type="text"
          name="name"
          label="Name"
          :input-styles="inputStyling()"
          container-classes="mt-4"
          :focus="errors.length ? true : false"
        />
        <ValidationBox width="250px" :message="errors[0]" />
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="phone|required">
        <ValidationInput
          v-model="number"
          placeholder="Client Number"
          input-type="tel"
          name="phone"
          label="Phone Number"
          :input-styles="inputStyling()"
          :input-classes="errors.length ? 'default-input--error' : ''"
          :focus="errors.length ? true : false"
        />
        <ValidationBox v-if="errors.length" width="250px" message="Please enter a valid phone number." />
      </ValidationProvider>
      <slot name="client-items" />
      <button :class="invalid ? 'button--disabled' : 'button--purple'" class="button button--success">
        Add Client
      </button>
    </form>
    <div v-if="sent">
      Emails sent!
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ValidationBox from '~/components/misc/ValidationBox'
import ValidationInput from '~/components/common/ValidationInput'
export default {
  components: {
    ValidationProvider,
    ValidationBox,
    ValidationObserver,
    ValidationInput
  },
  data () {
    return {
      name: '',
      email: '',
      number: '',
      sent: false
    }
  },
  computed: {
    clients () {
      return this.$store.state.clients.all
    },
    names () {
      return this.$store.state.clients.names
    },
    message () {
      return this.$store.state.clients.message
    }
  },
  methods: {
    inquire (name, email) {
      this.$axios.post('/reviewrequest', {
        client_name: name,
        client_email: email,
        agent: this.$store.state.auth.user.id
      })
        .then(({ data }) => {
          this.sent = true
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addClient () {
      this.$refs.observer.reset()
      this.$store.dispatch('clients/addClient', { name: this.name, email: this.email, phone_number: this.number })
      if (this.message.type !== 'error') {
        this.name = ''
        this.email = ''
      }
    },
    sendEmails () {
      this.clients.forEach((client) => {
        this.inquire(client.name, client.email)
      })
    },
    inputStyling () {
      return 'width: 250px'
    }

  }
}
</script>

<style>

</style>
