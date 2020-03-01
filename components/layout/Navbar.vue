<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <!-- <v-app-bar-nav-icon /> -->

      <v-toolbar-title>Agency Reviews</v-toolbar-title>
      <v-spacer />

      <v-btn nuxt to="/profile" text>
        Profile
      </v-btn>
      <v-btn text @click="logout">
        Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      return this.$store.dispatch('auth/logout', localStorage.getItem('auth_token'))
    }
  }
}
</script>

<style>

</style>
