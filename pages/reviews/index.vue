<template>
  <div class="reviews">
    <ReviewsContent
      v-if="loaded"
      button-title="Save Review"
      :button-c-t-a="saveReview"
    >
      <template slot="title">
        How was your experience with <b v-if="$store.state.reviews.reviewRequest">{{ $store.state.reviews.reviewRequest.agent.name }}</b>?
      </template>
      <template slot="subtitle">
        We won't publish your responses until after you confirm his review here.
      </template>
      <template slot="body">
        <RatingsStars />
      </template>
    </ReviewsContent>
    <div v-else class="loading d-flex justify-center align-center h-100">
      <v-progress-circular
        :width="3"
        color="black"
        indeterminate
      />
    </div>
  </div>
</template>

<script>
import ReviewsContent from '~/components/reviews/ReviewsContent'
import RatingsStars from '~/components/reviews/RatingStars'

export default {
  components: {
    ReviewsContent,
    RatingsStars
  },
  layout: 'default',
  async middleware ({ store, redirect }) {
    const checkParamsExist = window.location.search.slice(1)

    if (checkParamsExist) {
      const params = checkParamsExist
        .split('&')
        .reduce(function _reduce (/* Object */ a, /* String */ b) {
          b = b.split('=')
          a[b[0]] = decodeURIComponent(b[1])
          return a
        }, {})

      if (params) {
        const data = params.rating.split('-')
        if (params) {
          await store.dispatch('reviews/getReview', data[1])
        }
        if (store.state.reviews.reviewRequest.star_rating_completed) {
          return redirect('/reviews/localfeedback/' + store.state.reviews.reviewRequest.id)
        }
        if (data.length) {
          store.commit('reviews/setChosen', data[0])
        }
      }
    }
  },
  computed: {
    loaded () {
      return this.$store.state.reviews.reviewRequest
    }
  },
  methods: {
    async saveReview () {
      if (this.$store.state.reviews.chosen === 0) {
        alert('Please leave a review to continue.')
        return
      }
      await this.$store.dispatch('reviews/stepComplete', { star_rating_completed: new Date(), id: this.$store.state.reviews.reviewRequest.id, star_rating: this.$store.state.reviews.chosen, route: 'reviews/localfeedback/1' })
    }
  }
}
</script>

<style>
.loading {
  height: 100vh;
}
</style>
