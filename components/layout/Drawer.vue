<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    temporary
  >
    <v-list-item v-if="user">
      <v-list-item-avatar>
        <v-img :src="user.profile.image" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ user.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <div v-else>
      <img class="pa-4" width="150px" src="@/assets/title.png">
    </div>
    <v-divider />

    <v-list dense>
      <v-list-item
        v-for="route in routes"
        :key="route.name"
        link
        :to="route.action ? route.action : '#'"
      >
        <v-list-item-icon>
          <v-icon small color="#6b79ed">
            {{ route.icon }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="text-purple">
            {{ route.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    drawer: {
      get () {
        return this.$store.state.navigation.drawer
      },
      set (value) {
        if (!value) {
          this.$store.commit('navigation/setDrawer', false)
        }
      }
    },
    routes () {
      return this.$store.state.navigation.guestRoutes
    },
    user () {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style>

</style>
