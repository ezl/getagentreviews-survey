<template>
  <div class="reviews">
    <h3 v-if="!rated || !leftFeedBackLocal || !leftFeedBackExternal" class="text-purple text-center">
      Agent Reviews
    </h3>
    <Rating v-if="!rated" />
    <LocalFeedBack v-else-if="rated && !leftFeedBackLocal" />
    <ExternalFeedBack v-else-if="feedback && !leftFeedBackExternal" />
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
  computed: {
    rated () {
      return this.$store.state.reviews.rated
    },
    leftFeedBackLocal () {
      return this.$store.state.reviews.leftFeedBackLocal
    },
    feedback () {
      return this.$store.state.reviews.feedback
    },
    leftFeedBackExternal () {
      return this.$store.state.reviews.leftFeedBackExternal
    }
  }
}
</script>

<style lang="scss"></style>
