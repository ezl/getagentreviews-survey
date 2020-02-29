<template>
  <div
    class="external-feedback__card center-flex-v-h"
    @click="externalSubmit"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  methods: {
    externalSubmit () {
      // this.$store.commit('reviews/setLeftFeedBackExternal', this.location)
      this.$store.dispatch('reviews/stepComplete', { id: this.$store.state.reviews.reviewRequest.id, external_link_clicked: new Date(), external_review_completed: new Date(), route: '/reviews/thankyou/' + this.$store.state.reviews.reviewRequest.id })
    }
  }
}
</script>

<style lang="scss">
</style>
