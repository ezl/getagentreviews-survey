<template>
  <v-app>
    <div class="guest">
      <Navbar :routes="routes()" />
      <nuxt />
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
        { name: 'Login', action: '/login' },
        { name: 'Register', action: '/register', bgColor: 'purple' }
      ]
    }
  }
}
</script>

<style>
</style>
