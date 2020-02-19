<template>
  <div class="ratings">
    <h3 class="text-purple text-center">
      Agent Reviews
    </h3>
    <Rating v-if="!$store.state.reviews.rated" />
    <LocalFeedBack v-else-if="$store.state.reviews.rated && !$store.state.reviews.leftFeedBackLocal" />
    <ExternalFeedBack v-else-if="$store.state.reviews.feedback && !$store.state.reviews.leftFeedBackExternal" />
    <ThankYou v-else />
  </div>
</template>

<script>
import Rating from './Rating'
import LocalFeedBack from './LocalFeedBack'
import ExternalFeedBack from './ExternalFeedback'
import ThankYou from './ThankYou'
export default {
  components: {
    Rating,
    LocalFeedBack,
    ExternalFeedBack,
    ThankYou
  },
  data() {
    return {
    }
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
</style>
