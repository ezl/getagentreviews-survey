<template>
  <div class="thank-you">
    <ReviewsContent v-if="$store.state.reviews.reviewRequest" :include-title="false" :include-button="false">
      <template slot="top-icon">
        <i class="far fa-thumbs-up" />
      </template>
      <template slot="title">
        Thank you for your feedback.
      </template>
      <template slot="subtitle">
        <span class="multi-line-body">I'll read what you've written and work to incorporate your feedback</span>
        <span>to provide better experiences in the future</span>
      </template>
      <template slot="extra-content">
        <br>
        Review: {{ $store.state.reviews.reviewRequest.star_rating }} <template v-if="$store.state.reviews.reviewRequest.star_rating === 1">
          star
        </template><template v-else>
          stars
        </template><br>
        Feedback: {{ $store.state.reviews.reviewRequest.feedback }}<br>
        User: {{ $store.state.reviews.reviewRequest.agent.email }}<br>
        Agent: {{ $store.state.reviews.reviewRequest.agent.name }}<br>
        <!-- Left Feedback on: <span v-for="places in $store.state.reviews.leftFeedBackExternal" :key="places">{{ places }}<template v-if="$store.state.reviews.leftFeedBackExternal.length > 1">, </template></span> -->
      </template>
    </ReviewsContent>
  </div>
</template>

<script>
import ReviewsContent from '~/components/reviews/ReviewsContent'
export default {
  components: {
    ReviewsContent
  },
  async middleware ({ store, redirect, params }) {
    if (params) {
      if (!store.state.reviews.reviewRequest) {
        await store.dispatch('reviews/getReview', params.id)
      }
      if (!store.state.reviews.reviewRequest.external_review_completed && store.state.reviews.reviewRequest.star_rating > 3) {
        return redirect('/reviews/externalfeedback/' + store.state.reviews.reviewRequest.id)
      }
    }
  },
  head () {
    return {
      title: 'Thank You'
    }
  }
//   mounted () {
//     this.submitReview()
//   },
//   methods: {
//     submitReview () {
//       this.$axios.post('/reviews', {
//         email: this.$store.state.auth.email.email,
//         agent: this.$store.state.reviews.agent.id,
//         rating: this.$store.state.reviews.chosen,
//         review: this.$store.state.reviews.feedback
//       })
//         .then(({ data }) => {
//           console.log(data)
//         })
//         .catch((err) => {
//           console.log('err', err)
//         })
//     }
//   }
}
</script>

<style>

</style>
