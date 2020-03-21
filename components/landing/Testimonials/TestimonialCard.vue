<template>
  <v-card
    :loading="loading"
    class="my-12 ml-3 mr-3"
    max-width="374"
  >
    <v-card-text>
      <div class="mb-8">
        <i>"{{ quote }}"</i>
      </div>
      <v-rating
        :value="5"
        color="amber"
        dense
        half-increments
        readonly
        size="14"
      />
    </v-card-text>

    <v-card-actions class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <v-list-item-avatar color="grey" />
        <div>
          <b class="d-block">Stormie Hansford</b>
          <span>CEO, Realhousingstate</span>
        </div>
      </div>
      <div>
        logo
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    quote: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.v-card {
  padding-bottom: 10px;
  font-size: 12px;
}
</style>
