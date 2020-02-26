<template>
  <ReviewsContent
    button-title="Save Review"
    :button-c-t-a="saveReview"
  >
    <template slot="title">
      How was your experience with <b v-if="$store.state.reviews.agent">{{ $store.state.reviews.agent }}</b>?
    </template>
    <template slot="subtitle">
      We won't publish your responses until after you confirm his review here.
    </template>
    <template slot="body">
      <RatingsStars />
    </template>
  </ReviewsContent>
</template>

<script>
import ReviewsContent from './ReviewsContent'
import RatingsStars from './RatingStars'

export default {
  components: {
    ReviewsContent,
    RatingsStars
  },
  methods: {
    saveReview () {
      if (this.$store.state.reviews.chosen === 0) {
        alert('Please leave a review to continue.')
        return
      }
      this.$store.commit('reviews/setRated')
    }
  }
}
</script>

<style></style>
