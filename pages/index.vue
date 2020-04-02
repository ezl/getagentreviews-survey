<template>
  <div class="home">
    <GetMore />
    <HowItWorks />
    <Pricing />
    <Testimonials />
    <Contact />
  </div>
</template>

<script>
import GetMore from '~/components/landing/GetMore'
import HowItWorks from '~/components/landing/HowItWorks'
import Pricing from '~/components/landing/Pricing'
import Testimonials from '~/components/landing/Testimonials'
import Contact from '~/components/landing/Contact'
export default {
  layout ({ store }) { return store.state.auth.user ? 'authed' : 'guest' },
  components: {
    GetMore,
    HowItWorks,
    Pricing,
    Testimonials,
    Contact
  }

}
</script>

<style lang="scss" scoped>
@import '~/styles';
.home {
  @include lato();
}

</style>
