<template>
  <div class="external-feedback">
    <ReviewsContent
      :include-button="false"
      :multi-line-body="true"
    >
      <template slot="top-icon">
        <i class="fas fa-gifts" />
      </template>
      <template slot="title">
        Hooray! That's good to hear.
      </template>
      <template slot="subtitle">
        <span class="multi-line-body">One more thing. Reviews are super important for real estate agents
          like me.</span>
        <span class="multi-line-body">Could you leave me a review on Google? It would mean a lot.</span>
      </template>
      <template v-if="agent && google" slot="body">
        <span class="external-feedback__leave-review">Leave a review on:</span>
        <div class="google">
          <ExternalCard location="google">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Google_wordmark.svg/800px-Google_wordmark.svg.png"
              alt="google"
            >
          </ExternalCard>
        </div>
      </template>
      <template v-if="zillow || yelp || facebook" slot="extra-content">
        <span class="d-block">I don't have google but I'd be happy to leave a review on:</span>
        <v-row class="external-feedback__cards">
          <ExternalCard v-if="agent && zillow" location="zillow">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Zillow_logo19.png"
              alt="zillow"
            >
          </ExternalCard>
          <ExternalCard v-if="agent && yelp" location="yelp">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/1280px-Yelp_Logo.svg.png"
              alt="yelp"
            >
          </ExternalCard>
          <ExternalCard v-if="agent && facebook" location="facebook">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/Facebook%2C_Inc._Logo_2019.png"
              alt="facebook"
            >
          </ExternalCard>
        </v-row>
        <button v-if="$store.state.reviews.leftFeedBackExternal.length" class="button button--success mt-4" @click="$router.push('/reviews/thankyou')">
          Done
        </button>
      </template>
    </ReviewsContent>
  </div>
</template>

<script>
import ReviewsContent from '~/components/reviews/ReviewsContent'
import ExternalCard from '~/components/reviews/ExternalCard'
export default {
  components: {
    ReviewsContent,
    ExternalCard
  },
  computed: {
    agent () {
      return this.$store.state.reviews.agent
    },
    links () {
      return this.agent.profile.links
    },
    yelp () {
      return this.links && this.links.yelp
    },
    facebook () {
      return this.links && this.links.facebook
    },
    zillow () {
      return this.links && this.links.zillow
    },
    google () {
      return this.links && this.links.google
    }
  },
  async middleware ({ store, redirect, params }) {
    if (params) {
      if (!store.state.reviews.reviewRequest) {
        await store.dispatch('reviews/getReview', params.id)
      }
      if (!store.state.reviews.reviewRequest.agent.profile) { await store.dispatch('reviews/getAgent', store.state.reviews.reviewRequest.agent.id) }

      if (store.state.reviews.reviewRequest.star_rating <= 3) {
        return redirect('/reviews/thankyou/' + store.state.reviews.reviewRequest.id)
      }
      if (store.state.reviews.reviewRequest.external_review_completed) {
        return redirect('/reviews/thankyou/' + store.state.reviews.reviewRequest.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles';
  img {
    width: 100%;
  }
.external-feedback__cards {
  @include xlarge("down") {
     .v-card {
        margin: 0 8px;
      }
  }
  @include large("up") {
    // width: 694px;
    position: relative;
    left: -3px;
    justify-content: flex-start !important;
    .v-card {
        margin: 0 10px;
  }
  }
  @include medium("down") {
    justify-content: center;
    margin: 0;
      .v-card {
        margin: 8px;
        width: 275x;

      }
  }
}
</style>
