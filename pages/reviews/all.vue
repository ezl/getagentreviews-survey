<template>
  <div class="all-reviews">
    <div v-if="reviews.length">
      <div
        v-for="(review, index) in reviews"
        :key="review.id"
        class="text-center"
      >
        <h3>{{ index + 1 }}.</h3>
        <h3>Review from {{ review.email }}</h3>
        <p>Review: {{ review.review }}</p>
        <p>{{ review.rating }}({{ goodReview(review.rating) }})</p>
        <span>Agent: {{ review.agent }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      reviews: []
    }
  },
  async mounted () {
    try {
      const res = await this.$axios.get('/reviews')
      this.reviews = res.data
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    goodReview (rating) {
      if (rating > 3) {
        return 'Good Feedback'
      } else {
        return 'Negative Feedback'
      }
    }
  }
}
</script>

<style></style>
