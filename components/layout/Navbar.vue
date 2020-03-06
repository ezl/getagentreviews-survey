<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <!-- <v-app-bar-nav-icon /> -->
      <nuxt-link to="/" style="color: white;">
        <v-toolbar-title>
          Agency Reviews
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer />
      <v-btn
        v-for="route in routes"
        :key="route.name"
        nuxt
        text
        :to="route.action && route.action"
      >
        {{ route.name }}
      </v-btn>
      <v-btn v-if="$store.state.auth.user" text @click="logout">
        Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => {}
    }
  },
  methods: {
    logout () {
      return this.$store.dispatch('auth/logout', this.$cookiz.get('auth-token'))
    }
  }
}
</script>

<style>

</style>
