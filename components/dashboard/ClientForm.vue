<template>
  <!-- to do -->
  <ValidationObserver v-slot="{ handleSubmit, invalid }">
    <ValidationBox v-if="message" :message="message.text" />
    <form @submit.prevent="handleSubmit(addClient)">
      <ValidationProvider rules="required">
        <ValidationInput
          v-model="name"
          placeholder="Client Name"
          input-type="text"
          name="name"
          label="Name"
          :input-styles="inputStyling()"
          container-classes="mt-4"
          :focus="!name ? true : false"
        />
      </ValidationProvider>
      <ValidationProvider rules="email|required">
        <ValidationInput
          v-model="email"
          placeholder="Client Email"
          input-type="email"
          name="email"
          label="Email"
          :input-styles="inputStyling()"
          :input-classes="message && message.type === 'error' ? 'default-input--error' : ''"
          :focus="message && message.type === 'error' && true"
        />
      </ValidationProvider>
      <slot name="client-items" />
      <button type="button" class="button button--secondary">
        Upload CSV
      </button>
      <button :class="invalid ? 'button--disabled' : 'button--purple'" class="button button--success">
        Add Client
      </button>
      <button v-if="clients && clients.length" type="button" class="button button--purple" @click="sendEmails">
        Send Emails
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
      this.$store.dispatch('clients/addClient', { name: this.name, email: this.email })
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
