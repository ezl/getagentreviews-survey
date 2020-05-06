<template>
  <v-card
    height="174"
    class="dashboard-top__card"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="subtitle-1">
          <i class="card-icon text-white" :class="iconClasses" /> <span class="text-purple">{{ title }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <span class="text-purple display-1">{{ count }}</span>
    </v-card-text>

    <v-list-item>
      <v-list-item-title>
        <span class="text-purple">
          {{ title.split(' ')[0] }}
        </span>
      </v-list-item-title>

      <v-list-item-subtitle class="text-right">
        <!-- <span class="text-purple"><i class="fas fa-long-arrow-alt-up" style="color:green" /> {{ growth }}</span> -->
      </v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    cardType: {
      type: String,
      default: 'positive'
    }
  },
  computed: {
    negative () {
      return this.cardType === 'negative'
    },
    positive () {
      return this.cardType === 'positive'
    },
    pending () {
      return this.cardType === 'pending'
    },
    iconClasses () {
      if (this.negative) {
        return 'bg-red far fa-thumbs-down'
      }
      if (this.pending) {
        return 'bg-alt-purple far fa-clipboard'
      }
      return 'bg-purple far fa-thumbs-up'
    },
    title () {
      if (this.negative) {
        return 'Negative Reviews'
      }
      if (this.pending) {
        return 'Pending Reviews'
      }
      return 'Positive Reviews'
    },
    reviews () {
      const reviewArray = this.$store.state.clients.all.filter((review) => {
        if (review.external_link_clicked && review.external_review_completed) {
          return review
        }
      })
      return reviewArray.length
    },
    feedback () {
      const feedbackArray = this.$store.state.clients.all.filter((review) => {
        if (review.feedback_completed && review.feedback) {
          return review
        }
      })
      return feedbackArray.length
    },
    total () {
      return this.$store.state.clients.all.length
    },
    count () {
      if (this.negative) {
        return this.feedback
      }
      if (this.pending) {
        return this.total
      }
      return this.reviews
    },
    growth () {
      if (this.negative) {
        // return (Number(this.feedback) * Number(this.pending)) / Number(this.pending)
        return ''
      }
      if (this.pending) {
        return ''
      }
      // return (this.reviews * this.pending) / this.pending
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles';
.card-icon {
    padding: 6px;
    border-radius: 50%;
}
</style>
