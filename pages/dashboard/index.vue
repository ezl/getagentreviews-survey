<template>
  <div class="mt-10">
    <div v-if="$store.state.auth.user" class="ml-1">
      <v-data-table
        :headers="headers"
        :items="clients"
        :items-per-page="5"
        class="elevation-1"
        item-key="email"
      >
        <template v-if="clients.length" v-slot:header.sent>
          <button class="button button--landing" @click="sendEmails">
            Send to All
          </button>
        </template>
        <template v-slot:header.added="{ header }">
          {{ header.text }}<v-icon small>
            fas fa-info-circle
          </v-icon>
        </template>
        <template v-slot:item.sent="{ item }">
          <button class="button button--purple" @click="inquire(item.name, item.email)">
            Send Request
          </button>
          <button class="button" @click="remove(item)">
            Remove
          </button>
        </template>
        <template v-slot:item.name="{ item }">
          <span v-if="!names.includes(item.name)" @click="$store.commit('clients/fieldAction', {action: 'edit', item: 'names', data: item.name})">
            {{ item.name }}
          </span>
          <ClientEditable
            v-else
            :initial-data="item.name"
            update-field="name"
            update-item="names"
            :client="item"
            input-type="text"
            rules="required"
            styles="max-width: 120px; margin-bottom: 0; margin-top: 0;"
          />
        </template>
        <template v-slot:item.email="{ item }">
          <span v-if="!emails.includes(item.email)" @click="$store.commit('clients/fieldAction', {action: 'edit', item: 'emails', data: item.email})">
            {{ item.email }}
          </span>
          <ClientEditable
            v-else
            :initial-data="item.email"
            update-field="email"
            update-item="emails"
            :client="item"
            input-type="email"
            rules="required|email"
            styles="max-width: 160px; margin-bottom: 0; margin-top: 0;"
          />
        </template>
      </v-data-table>
      <div class="text-center ma-2">
        <v-snackbar
          v-model="sent"
          top
        >
          Emails Sent
          <v-btn
            color="green"
            text
            @click="sent = false"
          >
            Close
          </v-btn>
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import ClientEditable from '~/components/dashboard/ClientEditable'
export default {
  components: {
    ClientEditable
  },
  data () {
    return {
      sent: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'number' },
        { text: 'Added', value: 'added' },
        { text: 'Status', value: 'sent', sortable: false }
      ]
    }
  },

  computed: {
    clients () {
      return this.$store.state.clients.all
    },
    names () {
      return this.$store.state.clients.names
    },
    emails () {
      return this.$store.state.clients.emails
    }
  },
  middleware: 'authed',
  // temporary
  layout: 'dashboard',
  methods: {
    sendEmails () {
      this.clients.forEach((client) => {
        this.inquire(client.name, client.email)
      })
    },
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
    remove (passedClient) {
      this.$store.dispatch('clients/remove', passedClient)
    }
  }
}
</script>

<style lang="scss" scoped>
.button--landing {
  padding: 6px 4px;
}
</style>
