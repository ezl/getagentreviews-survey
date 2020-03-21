<template>
  <div class="pricing">
    <span class="d-block text-purple text-center">PRICING</span>
    <h2 class="text-center mb-7">
      Solutions for both individuals or for your whole company
    </h2>
    <div class="d-flex justify-center mb-8">
      <v-card
        class="mr-8 pb-11"
        max-width="347"
      >
        <div class="d-flex bg-purple--gradient mb-8">
          <div class="text-white justify-space-between card-header">
            <h4>
              Individual
            </h4>
            <p>For individual real estate agents or brokers.</p>
          </div>
          <div style="width: 40%; align-self:center; text-align: right; padding-right: 20px;">
            <i class="fas fa-user-alt" />
          </div>
        </div>
        <h2 class="text-center text-purple card-padding pricing__price">
          <span class="d-block">$39.99</span> per month
        </h2>
        <v-card-actions class="pb-5 d-flex justify-center">
          <button class="button button--landing">
            Try For Free
          </button>
        </v-card-actions>
      </v-card>
      <v-card
        class="pb-11"
        max-width="347"
      >
        <div class="d-flex bg-purple--gradient mb-8">
          <div class="text-white justify-space-between card-header">
            <h4>Agency</h4>
            <p>
              Discounted group pricing for
              companies onboarding 5 or more real estate agents.
            </p>
          </div>
          <div style="width: 40%; align-self:center; text-align: right; padding-right: 20px;">
            <i class="fas fa-user-alt" />
          </div>
        </div>
        <h2 class="text-center text-purple card-padding pricing__price">
          <span class="d-block">$34.99</span> per seat per month
        </h2>
        <span class="text-center d-block text-purple">How many agents need an account?</span>
        <v-card-actions class="pb-5 d-flex justify-center">
          <button class="button button--landing mx-auto">
            Try For Free
          </button>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.card-padding {
  padding: 35px 0;
}
h3 {
  font-weight: 400;
}
.v-card {
  height: 420px;
  p {
    font-size: 14px;
    margin-top: 5px;
  }
}
.card-header {
  padding: 12px 10px;
}
.pricing__price {
    font-weight: 400;
    font-size: 20px;
}
</style>
