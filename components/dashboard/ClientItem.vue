<template>
  <div class="d-flex align-center">
    <div>
      <v-card
        width="300"
        class="mb-4"
        tile
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title v-if="!names.includes(client.name)" @click="$store.commit('clients/fieldAction', {action: 'edit', item: 'names', data: client.name})">
              {{ client.name }}
            </v-list-item-title>
            <ClientEditable
              v-else
              :initial-data="client.name"
              update-field="name"
              update-item="names"
              :client="client"
              input-type="text"
              rules="required"
            />
            <v-list-item-subtitle v-if="!emails.includes(client.email)" class="editable" @click="$store.commit('clients/fieldAction', {action: 'edit', item: 'emails', data: client.email})">
              {{ client.email }}
            </v-list-item-subtitle>
            <ClientEditable
              v-else
              :initial-data="client.email"
              update-field="email"
              update-item="emails"
              :client="client"
              input-type="email"
              rules="required|email"
              styles="color: rgba(0, 0, 0, 0.6); font-size: 0.875rem;"
            />
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>
    <div>
      <v-btn icon color="red" @click="remove(client)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import ClientEditable from './ClientEditable'
export default {
  components: {
    ClientEditable
  },
  props: {
    client: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      name: '',
      email: ''
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
  mounted () {
    this.clientCopy = this.client
    this.name = this.client.name
    this.email = this.client.email
  },
  methods: {
    nameAction (key, action) {
      if (action === 'edit') {
        this.editingNames = [...this.editingNames, key]
        this.$nextTick(() => {
          this.$refs.nameEdit[key].focus()
        })
      } else {
        this.editingNames = this.editingNames.filter(i => i !== key)
      }
    },
    remove (passedClient) {
      this.$store.dispatch('clients/remove', passedClient)
    }
  }
}
</script>

<style lang="scss" scoped>
// .editable {
//     background-color: gray;
//     &:hover {
//         background-color: rgba(0, 0, 0, 0.459);
//     }
// }
.v-list-item__subtitle, .v-list-item__title {
    cursor: text;
    &:hover {
      background-color: rgba(0, 0, 0, 0.205);
    }
}
</style>
