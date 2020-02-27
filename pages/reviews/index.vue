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
import ReviewsContent from '~/components/reviews/ReviewsContent'
import RatingsStars from '~/components/reviews/RatingStars'

export default {
  components: {
    ReviewsContent,
    RatingsStars
  },
  mounted () {
    this.retrieveData()
  },
  methods: {
    saveReview () {
      if (this.$store.state.reviews.chosen === 0) {
        alert('Please leave a review to continue.')
        return
      }
      this.$store.commit('reviews/setRated')
    },
    retrieveData () {
      const checkParamsExist = window.location.search.slice(1)
      if (checkParamsExist) {
        const params = checkParamsExist
          .split('&')
          .reduce(function _reduce (/* Object */ a, /* String */ b) {
            b = b.split('=')
            a[b[0]] = decodeURIComponent(b[1])
            return a
          }, {})
        console.log(params)
        if (params) {
          const data = params.rating.split('-')
          if (data.length) {
            this.$store.commit('reviews/setChosen', data[0])
            this.$store.dispatch('auth/getEmail', data[1])
            this.$store.dispatch('reviews/getAgent', data[2])
          }
        }
      }
    }
  }
}
</script>

<style></style>
