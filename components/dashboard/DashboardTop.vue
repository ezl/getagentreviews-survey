<template>
  <div class="dashboard-top d-flex justify-space-between">
    <DashboardTopCard />
    <DashboardTopCard />
    <DashboardTopCard />
    <div class="d-flex flex-column align-space-between" style="height: 174px;">
      <span><v-icon class="mr-2">mdi-tab</v-icon>Notification</span>
      <v-btn class="d-block" rounded style="color: blue; border: 1px solid blue;">
        Refer & Earn
      </v-btn>
      <v-btn dark color="red" class="d-block" rounded>
        Gmail Connected
      </v-btn>
      <v-btn dark color="#6b79ed" class="d-block" rounded>
        (+) Add People
      </v-btn>
    </div>
  </div>
</template>

<script>
import DashboardTopCard from './DashboardTop/DashboardTopCard'
export default {
  components: {
    DashboardTopCard
  }
}
</script>

<style lang="scss" scoped>

</style>
