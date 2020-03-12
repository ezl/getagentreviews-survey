<template>
  <div>
    <div v-if="$store.state.auth.user" class="ml-3">
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
            />
          </ValidationProvider>
          <div v-for="(client, key) in clients" :key="key" class="d-flex">
            <v-card
              v-if="clients.length"
              width="300"
              class="mb-4"
              tile
            >
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title v-if="!editingNames.includes(key)" @click="nameAction(key, 'edit')">
                    {{ client.name }}
                  </v-list-item-title>
                  <input
                    v-else
                    id="editing-name"
                    ref="nameEdit"
                    type="text"
                    name="editing-name"
                    :value="client.name"
                  >
                  <v-list-item-subtitle>{{ client.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
            <v-btn class="align-self-center" icon color="red" @click="remove(client)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </div>
          <button type="button" class="button button--secondary">
            Upload CSV
          </button>
          <button :class="invalid ? 'button--disabled' : 'button--purple'" class="button button--success">
            Add Client
          </button>
          <button v-if="clients.length" type="button" class="button button--purple" @click="sendEmails">
            Send Emails
          </button>
        </form>
      </ValidationObserver>
      <div v-if="sent">
        Emails sent!
      </div>
    </div>
    <span v-else>
      <nuxt-link to="/login">
        Login
      </nuxt-link> to start sending emails
    </span>
  </div>
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
      editingNames: [],
      editingEmails: [],
      sent: false,
      clients: [],
      message: ''
    }
  },
  // temporary
  layout ({ store }) { return store.state.auth.user ? 'authed' : 'guest' },
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
      this.message = null
      const exists = this.clients.find(client => client.email === this.email)
      if (exists) {
        this.message = { text: 'That email is already included.', type: 'error' }
        return
      }
      this.clients = [...this.clients, { name: this.name, email: this.email }]
      this.name = ''
      this.email = ''
    },
    remove (passedClient) {
      this.clients = this.clients.filter(client => client !== passedClient)
    },
    sendEmails () {
      this.clients.forEach((client) => {
        this.inquire(client.name, client.email)
      })
    },
    inputStyling () {
      return 'width: 250px'
    },
    nameAction (key, action) {
      if (action === 'edit') {
        this.editingNames = [...this.editingNames, key]
        this.$nextTick(() => {
          this.$refs.nameEdit[key].focus()
        })
      } else {
        this.editingNames = this.editingNames.filter(i => i !== key)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// .v-list-item.v-list-item--two-line.theme--light {
//   cursor: pointer;
//  &:hover {
//    background-color: lighten(gray, 16%);
//  }
// }
</style>
