<template>
  <div class="reviews">
    <ReviewsContent
      v-if="loaded"
      button-title="Save Review"
      :button-c-t-a="saveReview"
    >
      <template slot="title">
        How was your experience with <b v-if="$store.state.reviews.reviewRequest">{{ $store.state.reviews.reviewRequest.agent.name }}</b>
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
  async middleware ({ store, redirect, params }) {
    const paramsExist = params.review.split('rating=')
    let rating = null
    let review = null
    if (paramsExist.length) {
      const params = paramsExist[1].split('-')
      rating = params[0]
      review = params[1]
      await store.dispatch('reviews/getReview', review)
      await store.dispatch('reviews/getAgent', store.state.reviews.reviewRequest.agent.id)
      store.commit('reviews/setChosen', rating)
      if (store.state.reviews.reviewRequest.star_rating_completed) {
        return redirect('/reviews/localfeedback/' + store.state.reviews.reviewRequest.id)
      }
    } else {
      return redirect('/login')
    }
  },
  computed: {
    loaded () {
      return this.$store.state.reviews.reviewRequest
    },
    routeTo () {
      if (this.$store.state.reviews.chosen > 3 || this.$store.state.reviews.reviewRequest.star_rating > 3) {
        return '/reviews/externalfeedback/'
      }
      return '/reviews/localfeedback/'
    }
  },
  methods: {
    async saveReview () {
      if (this.$store.state.reviews.chosen === 0) {
        alert('Please leave a review to continue.')
        return
      }
      await this.$store.dispatch('reviews/stepComplete', { star_rating_completed: new Date(), id: this.$store.state.reviews.reviewRequest.id, star_rating: this.$store.state.reviews.chosen, route: '/reviews/localfeedback/' + this.$store.state.reviews.reviewRequest.id })
    }
  }
}
</script>

<style>
.loading {
  height: 100vh;
}
</style>
