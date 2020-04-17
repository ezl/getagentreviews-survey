<template>
  <v-container>
    <v-row class="flex-column-reverse align-center flex-sm-column-reverse flex-md-row align-sm-center align-md-start" justify="center">
      <v-col sm="7" lg="7" cols="11" md="7">
        <img class="how-it-works-image--single" src="@/assets/person2.png" alt="person">
      </v-col>
      <v-col class="mt-4 how-it-works-text" sm="6" md="5" lg="4" cols="10">
        <CircledNumber number="2" />
        <h2>We ask the clients to</h2>
        <span class="how-it-works--gray">take a quick online survey about their experience.</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CircledNumber from '~/components/landing/HowItWorks/CircledNumber'

export default {
  components: {
    CircledNumber
  }
}
</script>

<style>

</style>
