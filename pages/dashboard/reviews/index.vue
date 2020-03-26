<template>
  <v-container>
    <div class="mt-10">
      <div v-if="$store.state.auth.user" class="ml-1">
        <v-data-table
          :headers="headers"
          :items="reviews"
          :items-per-page="5"
          class="elevation-1"
          item-key="email"
          no-data-text="No clients have left reviews yet"
        />
      </div>
    </div>
  </v-container>
</template>

<script>
export default {

  data () {
    return {
      sent: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        { text: 'Email', value: 'email' },
        { text: 'Review Date', value: 'external_review_completed' },
        { text: 'Reviewed On', value: 'external_link_clicked' },
        { text: 'Review', value: 'review' }
      ]
    }
  },

  computed: {
    reviews () {
      return this.$store.state.auth.reviews.filter((review) => {
        if (review.external_link_clicked && review.external_review_completed) {
          return review
        }
      })
    }
  },
  // temporary
  layout: 'dashboard',
  mounted () {
    if (!this.reviews.length) {
      this.getReviews()
    }
  },
  methods: {
    getReviews () {
      this.$store.dispatch('auth/getReviews', this.$store.state.auth.user.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.button--landing {
  padding: 6px 4px;
}
</style>
