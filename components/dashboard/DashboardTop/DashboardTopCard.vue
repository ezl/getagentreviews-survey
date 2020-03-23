<template>
  <v-card
    width="323"
    height="174"
    class="dashboard-top__card"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="subtitle-1">
          <i class="far fa-thumbs-up card-icon text-white bg-purple" /> <span class="text-purple">Positive Reviews</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <span class="text-purple display-1">300</span>
    </v-card-text>

    <v-list-item>
      <v-list-item-title>
        <span class="text-purple">
          Positive Reviews
        </span>
      </v-list-item-title>

      <v-list-item-subtitle class="text-right">
        <span class="text-purple"><i class="fas fa-long-arrow-alt-up" style="color:green" /> 30% more</span>
      </v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '~/styles';
.card-icon {
    padding: 6px;
    border-radius: 50%;
}
.dashboard-top__card {
// margin-right: 24px !important;
//   @include large("down") {
//     margin-left: 0 !important;
//     margin-right: 0 !important;
//     margin-bottom: 16px !important;
//   }
}
</style>
