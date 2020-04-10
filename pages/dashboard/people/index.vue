<template>
  <v-container>
    <div class="mt-10">
      <v-overlay :value="sending">
        <v-progress-circular indeterminate size="64" />
      </v-overlay>
      <div v-if="$store.state.auth.user" class="ml-1">
        <v-data-table
          :headers="headers"
          :items="clients"
          :items-per-page="15"
          class="elevation-1"
          item-key="email"
          no-data-text="No clients added yet, click the 'Add People' button to start adding"
        >
          <template v-if="clients.length" v-slot:header.sent>
            <button class="button button--landing" @click="sendEmails">
              Request All
            </button>
          </template>
          <template v-slot:header.added="{ header }">
            {{ header.text }}<v-icon small>
              fas fa-info-circle
            </v-icon>
          </template>
          <template v-slot:item.sent="{ item }">
            <button class="button" :class="item.feedback_completed || item.external_review_completed ? 'button--disabled' : 'button--purple' " @click="inquire(item.id, item.client.email, item)">
              {{ !item.email_sent ? 'Send Request' : 'Resend Request' }}
            </button>
            <button class="button" @click="remove(item)">
              Remove
            </button>
          </template>
          <template v-slot:item.status="{ item }">
            {{ determineStatus(item) }}
          </template>
          <template v-slot:item.name="{ item }">
            <span v-if="!names.includes(item.client.name)" @click="$store.commit('clients/fieldAction', {action: 'edit', item: 'names', data: item.client.name})">
              {{ item.client.name }}
            </span>
            <ClientEditable
              v-else
              :initial-data="item.client.name"
              update-field="name"
              update-item="names"
              :client="item"
              input-type="text"
              rules="required"
              styles="max-width: 120px; margin-bottom: 0; margin-top: 0;"
            />
          </template>
          <template v-slot:item.email="{ item }">
            <span v-if="!emails.includes(item.client.email)" @click="$store.commit('clients/fieldAction', {action: 'edit', item: 'emails', data: item.client.email})">
              {{ item.client.email }}
            </span>
            <ClientEditable
              v-else
              :initial-data="item.client.email"
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
            Request Sent to {{ temp }}
            <v-btn
              color="green"
              text
              @click="sent = false"
            >
              Close
            </v-btn>
          </v-snackbar>
          <BulkResults />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import ClientEditable from '~/components/dashboard/ClientEditable'
import BulkResults from '~/components/dashboard/People/BulkResults'
export default {
  loading: false,
  components: {
    ClientEditable,
    BulkResults
  },
  data () {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        { text: 'Email', value: 'email' },
        { text: 'Phone Number', value: 'client.phone_number' },
        { text: 'Added', value: 'created_at' },
        { text: 'Status', value: 'status', sortable: false },
        { text: 'Sent', value: 'sent', sortable: false }
      ],
      temp: ''
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
    },
    sending () {
      return this.$store.state.reviews.sending.value
    },
    sent: {
      get () {
        return this.$store.state.reviews.sent
      },
      set (val) {
        this.$store.commit('reviews/setSent', val)
      }
    },
    bulk: {
      get () {
        return this.$store.state.reviews.sending.bulkResolved
      },
      set (value) {
        this.$store.commit('reviews/setSending', { bulkResolved: value })
      }
    }
  },
  mounted () {
    if (!this.clients.length) {
      this.$store.dispatch('clients/getUserClients', this.$store.state.auth.user.id)
    }
  },
  // temporary
  layout: 'dashboard',
  methods: {
    sendEmails () {
      this.$store.dispatch('reviews/bulkSend', { items: this.clients })
    },
    inquire (id, email, item) {
      if (item.feedback_completed || item.external_review_completed) {
        return
      }
      this.temp = email
      this.$store.commit('reviews/setSending', { failed: [], success: [], bulk: false, value: false })
      this.$store.dispatch('reviews/stepComplete', { id, email_sent: new Date(), email })
    },
    remove (passedClient) {
      this.$store.dispatch('clients/remove', passedClient)
    },
    determineStatus (client) {
      let priority = 0
      if (!client.email_sent) {
        priority = 'None'
      }
      if (client.email_sent) {
        priority = 'Email Sent'
      }
      if (client.star_rating_completed) {
        priority = 'Star Rating Completed'
      }
      if (client.email_opened) {
        priority = 'Opened Email'
      }
      if (client.external_link_clicked) {
        priority = 'External Link Clicked'
      }
      if (client.external_review_completed) {
        priority = 'External Feedback Completed'
      }
      if (client.feedback_completed) {
        priority = 'Feedback Completed'
      }
      return priority
    }
  }
}
</script>

<style lang="scss" scoped>
.button--landing {
  padding: 6px 4px;
}
</style>
