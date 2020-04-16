<template>
  <div style="background-color: #F9F9FD;">
    <v-container>
      <v-row justify="center">
        <v-col class="mt-7 how-it-works-text" sm="6" lg="5" md="6" cols="10">
          <CircledNumber number="1" />
          <h2>We contact your clients after</h2>
          <span class="how-it-works--gray">successful deal is completed.</span>
        </v-col>
        <v-col sm="7" lg="3" md="6" cols="11">
          <img class="how-it-works-image--single" src="https://getagentreviews.com/_nuxt/img/3228836.png" alt="person">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CircledNumber from '~/components/landing/HowItWorks/CircledNumber'

export default {
  components: {
    CircledNumber
  }

}
</script>

<style lang="scss" scoped>

</style>
