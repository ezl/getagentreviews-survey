<template>
  <div class="home">
    <GetMore />
    <HowItWorks />
    <Pricing />
    <span class="d-block text-purple text-center">TESTIMONALS</span>
    <h2 class="text-center mb-7">
      What Clients Say About Us
    </h2>
    <div class="d-flex justify-center">
      cards
    </div>
    <v-container>
      contact form
    </v-container>
  </div>
</template>

<script>
import GetMore from '~/components/landing/GetMore'
import HowItWorks from '~/components/landing/HowItWorks'
import Pricing from '~/components/landing/Pricing'
export default {
  layout ({ store }) { return store.state.auth.user ? 'authed' : 'guest' },
  components: {
    GetMore,
    HowItWorks,
    Pricing
  }

}
</script>

<style lang="scss" scoped>
@import '~/styles';
.home {
  @include lato();
}

</style>
