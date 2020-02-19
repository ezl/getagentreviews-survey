<template>
  <div class="external-feedback">
    <ReviewsContent :includeButton="false">
      <template slot="top-icon">
        <i class="fas fa-gifts"></i>
      </template>
      <template slot="title">
        Hooray! That's good to hear.
      </template>
      <template slot="subtitle">
        <span class="d-block"
          >One more thing. Reviews are super important for real estate agents
          like me.</span
        >
        <span>Could you leave me a review on Google? It would mean a lot.</span>
      </template>
      <template slot="body">
        <span class="external-feedback__leave-review">Leave a review on:</span>
        <div class="google">
          <ExternalCard>
            <i class="fab fa-google"></i>
          </ExternalCard>
        </div>
      </template>
      <template slot="extra-content">
        <span class="d-block"
          >I don't have google but I'd be happy to leave a review on:</span
        >
        <div class="external-feedback__others">
         <ExternalCard>
            <i class="fab fa-google"></i>
          </ExternalCard>
         <ExternalCard>
            <i class="fab fa-google"></i>
          </ExternalCard>
         <ExternalCard>
            <i class="fab fa-google"></i>
          </ExternalCard>
        </div>
      </template>
    </ReviewsContent>
  </div>
</template>

<script>
import ReviewsContent from './ReviewsContent'
import ExternalCard from './ExternalCard'
export default {
  components: {
    ReviewsContent,
    ExternalCard
  }
}
</script>

<style lang="scss">
.external-feedback {
  .d-block {
    margin-bottom: 10px;
  }

  .external-feedback__leave-review {
    margin-bottom: 100px;
    color: blue;
  }

  .google {
    margin-top: 15px;
    margin-bottom: 50px;
  }
  .external-feedback__others {
    display: flex;
    justify-content: space-between;
    width: 90%;
  }
}
</style>
