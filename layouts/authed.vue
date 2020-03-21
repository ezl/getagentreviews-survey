<template>
  <v-app>
    <div class="authed">
      <Navbar :routes="routes()" />
      <div style="min-height: 88vh;">
        <nuxt />
      </div>
      <Footer />
    </div>
  </v-app>
</template>

<script>
import Navbar from '~/components/layout/Navbar'
import Footer from '~/components/layout/Footer'
export default {
  components: {
    Navbar,
    Footer
  },
  methods: {
    routes () {
      return [
        { name: 'Profile', action: '/profile' }
      ]
    },
    logout () {
      alert('happeend')
      return this.$store.dispatch('auth/logout', this.$cookiz.get('auth-token'))
    }
  }
}
</script>

<style scoped></style>
