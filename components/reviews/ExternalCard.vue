<template>
  <v-card :hover="true" target="_blank" :href="`http://${location}.com`" elevation="24" class="d-flex justify-center align-center pa-10">
    <slot />
  </v-card>
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

<style lang="scss" scoped>
.v-card {
  opacity: 0.82;
  width: 210px;
  height: 110px;
  transition: all .25s ease-in;
  &:hover {
    opacity: 1;
    transform: scale(1.04);
  }
}
</style>
