<template>
  <v-app>
    <div class="authed">
      <Navbar />
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
  }
}
</script>

<style scoped></style>
