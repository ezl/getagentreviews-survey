<template>
  <div class="local-feedback">
    <ReviewsContent
      button-title="Submit"
      :button-c-t-a="submitFeedBack"
    >
      <template slot="top-icon">
        <i
          v-if="goodFeedBack"
          class="far fa-smile-beam"
        />
        <i
          v-else
          class="far fa-frown-open"
        />
      </template>
      <template slot="title">
        <template v-if="goodFeedBack">
          <b>{{ $store.state.reviews.reviewRequest.agent.name }}</b>, we are happy we've hit the mark
        </template>
        <template v-else>
          <b>{{ $store.state.reviews.reviewRequest.agent.name }}</b>, we are sorry to hear that we missed the mark
        </template>
      </template>
      <template slot="subtitle">
        <template v-if="goodFeedBack">
          <span class="multi-line-body">
            Can you share a few words on how I could make your experience even
            better for the future?
          </span>
          <span>Your feedback is important to me and I'd like to improve your
            situation ASAP.</span>
        </template>
        <template v-else>
          <span class="multi-line-body">
            Can you share a few words on how I could make your experience
            excellent in the future?
          </span>
          <span>Your feedback is important to me and I'll look into your situation
            ASAP.</span>
        </template>
      </template>
      <template slot="body">
        <textarea
          v-model="feedback"
          class="default-input"
          name="feedback"
          cols="30"
        />
      </template>
      <template slot="extra-content">
        <a class="local-feedback__link" href="#">
          Want to leave a review online?
        </a>
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
      if (store.state.reviews.reviewRequest.feedback_completed || store.state.reviews.reviewRequest.star_rating > 3) {
        return redirect('/reviews/externalfeedback/' + store.state.reviews.reviewRequest.id)
      }
    }
  },
  data () {
    return {
      feedback:
        'Great agent to work with never pushy, and genuinely has your best interests in mind.'
    }
  },
  computed: {
    goodFeedBack () {
      return this.$store.state.reviews.chosen > 3
    },
    user () {
      return this.$store.state.reviewRequest && this.$store.state.reviews.reviewRequest.agent.name
    }
  },
  methods: {
    submitFeedBack () {
      if (!this.feedback) {
        alert('Please leave us feedback!')
        return
      }
      // this.$store.commit('reviews/setLeftFeedBackLocal')
      // this.$store.commit('reviews/setFeedback', this.feedback)
      // this.$router.push('/reviews/externalfeedback/' + this.$route.params.id)
      this.$store.dispatch('reviews/stepComplete', { id: this.$route.params.id, feedback_completed: new Date(), feedback: this.feedback, route: '/reviews/externalfeedback/' + this.$store.state.reviews.reviewRequest.id })
    }
  }
}
</script>

<style lang="scss">
</style>
