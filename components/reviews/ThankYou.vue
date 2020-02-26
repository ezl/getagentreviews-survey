<template>
  <div class="thank-you">
    <ReviewsContent :include-button="false">
      <template slot="top-icon">
        <i class="far fa-thumbs-up" />
      </template>
      <template slot="title">
        Thank you fo your feedback.
      </template>
      <template slot="subtitle">
        <span class="multi-line-body">I'll read what you've written and work to incorporate your feedback</span>
        <span>to provide better experiences in the future</span>
      </template>
      <template slot="extra-content">
        <br>
        Review: {{ $store.state.reviews.chosen }} <template v-if="$store.state.reviews.chosen === 1">
          star
        </template><template v-else>
          stars
        </template><br>
        Feedback: {{ $store.state.reviews.feedback }}<br>
        User: {{ $store.state.auth.email.email }}<br>
        Agent: {{ $store.state.reviews.agent.name }}
      </template>
    </ReviewsContent>
  </div>
</template>

<script>
import ReviewsContent from './ReviewsContent'
export default {
  components: {
    ReviewsContent
  },
  mounted () {
    this.submitReview()
  },
  methods: {
    submitReview () {
      this.$axios.post('/reviews', {
        email: this.$store.state.auth.email.email,
        agent: this.$store.state.reviews.agent.id,
        rating: this.$store.state.reviews.chosen,
        review: this.$store.state.reviews.feedback
      })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log('err', err)
        })
    }
  }
}
</script>

<style>

</style>
