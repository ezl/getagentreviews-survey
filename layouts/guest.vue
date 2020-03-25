<template>
  <v-app>
    <div class="guest">
      <Navbar />
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
  }
}
</script>

<style>
</style>
