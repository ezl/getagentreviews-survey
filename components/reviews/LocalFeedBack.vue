<template>
  <div class="local-feedback">
    <ReviewsContent button-title="Submit" :buttonCTA="submitFeedBack">
      <template slot="top-icon">
        <i v-if="goodFeedBack" class="far fa-smile-beam"></i>
        <i v-else class="far fa-frown-open"></i>
      </template>
      <template slot="title">
        <template v-if="goodFeedBack">
          <b>John</b>, we are happy we've hit the mark
        </template>
        <template v-else>
          <b>John</b>, we are sorry to hear that we missed the mark
        </template>
      </template>
      <template slot="subtitle">
        <template v-if="goodFeedBack">
          <span class="multi-line-body">
            Can you share a few words on how I could make your experience even
            better for the future?
          </span>
          <span
            >Your feedback is important to me and I'd like to improve your
            situation ASAP.</span
          >
        </template>
        <template v-else>
          <span class="multi-line-body">
            Can you share a few words on how I could make your experience
            excellent in the future?
          </span>
          <span
            >Your feedback is important to me and I'll look into your situation
            ASAP.</span
          >
        </template>
      </template>
      <template slot="body">
        <textarea
          v-model="feedback"
          class="default-input"
          name="feedback"
          cols="30"
        ></textarea>
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
import ReviewsContent from './ReviewsContent'

export default {
  data() {
    return {
      feedback:
        'Great agent to work with never pushy, and genuinely has your best interests in mind.'
    }
  },
  components: {
    ReviewsContent
  },
  computed: {
    goodFeedBack() {
      return this.$store.state.reviews.chosen > 2
    }
  },
  methods: {
      submitFeedBack() {
          if(!this.feedback) {
              alert("Please leave us feedback!")
              return
          }
          this.$store.commit('reviews/setLeftFeedBackLocal')
          this.$store.commit('reviews/setFeedback', this.feedback)
      }
  }
}
</script>

<style lang="scss">

</style>
