<template>
  <div>
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
    <span v-else>
      <nuxt-link to="/login">
        Login
      </nuxt-link> to start sending emails
    </span>
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
