<template>
  <v-container>
    <div class="mt-10">
      <div v-if="$store.state.auth.user" class="ml-1">
        <v-data-table
          :headers="headers"
          :items="feedback"
          :items-per-page="15"
          class="elevation-1"
          item-key="email"
          no-data-text="No clients have left feedback yet"
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
        { text: 'Feedback Date', value: 'feedback_completed' },
        { text: 'Feedback', value: 'feedback' }
      ]
    }
  },

  computed: {
    feedback () {
      return this.$store.state.auth.reviews.filter((review) => {
        if (review.feedback_completed && review.feedback) {
          return review
        }
      })
    }
  },
  // temporary
  layout: 'dashboard',
  mounted () {
    if (!this.feedback.length) {
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
