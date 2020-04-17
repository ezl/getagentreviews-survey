<template>
  <v-container>
    <v-row align="start" justify="center">
      <v-col class="d-flex flex-column-reverse d-sm-flex d-md-block flex-sm-column-reverse align-sm-center align-md-start" sm="10" md="6" lg="7" cols="12">
        <img class="how-it-works-image--double person1" src="https://getagentreviews.com/_nuxt/img/f7e3360.png" alt="person">
        <div class="mt-9 text-center text-md-left">
          <h2>If the client has a great experience</h2>
          <span class="how-it-works--gray">we follow up and ask them to leave you a review online.</span>
        </div>
      </v-col>
      <v-col class="d-flex flex-column-reverse d-sm-flex d-md-block flex-sm-column-reverse align-sm-center align-md-start" sm="10" md="6" lg="5" cols="12">
        <img class="how-it-works-image--double person2" src="https://getagentreviews.com/_nuxt/img/c29b252.png" alt="person">
        <div class="mt-9 text-center ml-md-12">
          <h2>If the client had a bad experience</h2>
          <span class="how-it-works--gray">we ask for further information so you can address it with the client directly first instead of sending them directly to review you online.</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '~/styles';
 .person1 {
   @include custom(960px, "down") {
    //  transform: translateX(10%);
   }
 }
.person2 {
  @include custom(960px, "down") {
    //  transform: translateX(-10%);
   }
}
</style>
