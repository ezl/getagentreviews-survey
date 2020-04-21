<template>
  <v-col sm="7" xl="3" cols="11" md="4" lg="4">
    <v-card
      class="pb-11"
    >
      <div class="d-flex bg-purple--gradient mb-8">
        <div class="text-white justify-space-between card-header">
          <h4>Agency</h4>
          <p>
            Discounted group pricing for
            companies onboarding 5 or more real estate agents.
          </p>
        </div>
        <div style="width: 25%; align-self:center; text-align: right; padding-right: 20px;">
          <i class="fas fa-users" />
        </div>
      </div>
      <h2 class="text-center text-purple card-padding pricing__price">
        <span class="d-block">$34.99</span> per seat per month
      </h2>
      <span class="text-center d-block text-purple">How many agents need an account?</span>
      <v-card-text>
        <v-slider
          v-model="amountOfAgents"
          :tick-labels="agentLabels"
          :max="3"
          step="1"
          ticks="always"
          tick-size="4"
          color="gray"
          track-color="gray"
          thumb-color="#5b5bd1"
        />
      </v-card-text>
      <v-card-actions class="pb-5 d-flex justify-center">
        <button class="button button--landing mx-auto">
          Try For Free
        </button>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
export default {
  data () {
    return {
      amountOfAgents: 0,
      agentLabels: [
        '5+',
        '10+',
        '25+',
        '99+'
      ]
    }
  }
}

</script>

<style>

</style>
