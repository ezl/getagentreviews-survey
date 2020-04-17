<template>
  <div id="pricing" class="home__pricing">
    <span class="d-block text-purple text-center">PRICING</span>
    <h2 class="text-center mb-7">
      Solutions for both individuals or for your whole company
    </h2>
    <v-container>
      <v-row class="mb-8" justify="center">
        <Individual />
        <Agency />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Individual from '~/components/landing/Pricing/Individual'
import Agency from '~/components/landing/Pricing/Agency'
export default {
  components: {
    Individual,
    Agency
  }
}
</script>

<style lang="scss">
@import '~/styles';
.home__pricing {
.card-padding {
  padding: 16px 0;
}
h3 {
  font-weight: 400;
}
.v-card {
  height: 432px;
  padding-bottom:30px;
  p {
    font-size: 14px;
    margin-top: 5px;
  }
}
.card-header {
  padding: 12px 10px;
}
.pricing__price {
    font-weight: 400;
    font-size: 20px;
}
.v-card {
  // height: 450px
}
}
</style>
