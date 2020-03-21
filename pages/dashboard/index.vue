<template>
  <div class="mt-10">
    <div v-if="$store.state.auth.user" class="ml-3">
      <ClientForm>
        <template slot="client-items">
          <div v-for="(client, key) in clients" :key="key">
            <ClientItem :key="key" :client="client" />
            <!-- {{ clients }} -->
          </div>
        </template>
      </ClientForm>
    </div>
  </div>
</template>

<script>
import ClientItem from '~/components/dashboard/ClientItem'
import ClientForm from '~/components/dashboard/ClientForm'
export default {
  components: {
    ClientItem,
    ClientForm
  },
  computed: {
    clients () {
      return this.$store.state.clients.all
    }
  },
  middleware: 'authed',

  // temporary
  layout ({ store }) { return store.state.auth.user ? 'authed' : 'guest' }
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
