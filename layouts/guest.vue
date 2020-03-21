<template>
  <v-app>
    <div class="guest">
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
        { name: 'How it works', action: '/how' },
        { name: 'Pricing', action: '/pricing' },
        { name: 'Testimonials', action: '/testmonials' },
        { name: 'Contact', action: '/contact', color: 'white' },
        { name: 'Login', action: '/login', color: 'white' },
        { name: 'Sign Up', action: '/register', bgColor: 'white', rounded: true }
      ]
    }
  }
}
</script>

<style>
</style>
