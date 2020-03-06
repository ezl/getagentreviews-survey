<template>
  <div>
    <div v-if="$store.state.auth.user" class="ml-3">
      <form @submit.prevent="addClient">
        <input v-model="name" type="text" class="default-input mt-4 mb-4" placeholder="Enter Client Name">
        <input v-model="email" type="email" class="default-input mt-4 mb-4" placeholder="Enter Client Email">
        <v-card
          v-if="clients.length"
          max-width="400"
          class="mb-4"
          tile
        >
          <v-list-item v-for="(client, key) in clients" :key="key" two-line @click="remove(client)">
            <v-list-item-content>
              <v-list-item-title>{{ client.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ client.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <button type="button" class="button button--secondary">
          Upload CSV
        </button>
        <button v-if="name && email" class="button button--success">
          Add Client
        </button>
        <button v-if="clients.length" type="button" class="button button--purple" @click="sendEmails">
          Send Emails
        </button>
      </form>
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
export default {
  data () {
    return {
      name: '',
      email: '',
      sent: false,
      clients: []
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
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item.v-list-item--two-line.theme--light {
  cursor: pointer;
 &:hover {
   background-color: lighten(gray, 16%);
 }
}
</style>
