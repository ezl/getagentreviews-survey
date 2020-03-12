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
            <v-list-item-title v-if="!names.includes(client.name)" @click="$store.commit('clients/fieldAction', {action: 'edit', item: 'names', name: client.name})">
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
    </div>
    <div>
      <v-btn icon color="red" @click="remove(client)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    client: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    clients () {
      return this.$store.state.clients.all
    },
    names () {
      return this.$store.state.clients.names
    }
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
      this.clients = this.clients.filter(client => client !== passedClient)
    }
  }
}
</script>

<style>

</style>
