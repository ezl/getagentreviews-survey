<template>
  <v-row>
    <v-col col="1">
      <DashboardTopCard />
    </v-col>
    <v-col col="1">
      <DashboardTopCard />
    </v-col>
    <v-col col="1">
      <DashboardTopCard />
    </v-col>
    <v-col sm>
      <span>
        <v-icon class="mr-2">mdi-tab</v-icon>Notification
      </span>
      <v-btn
        class="d-block"
        rounded
        style="color: blue; border: 1px solid blue;"
      >
        Refer & Earn
      </v-btn>
      <v-btn
        dark
        color="red"
        class="d-block"
        rounded
      >
        Gmail Connected
      </v-btn>
      <v-btn
        dark
        color="#6b79ed"
        class="d-block"
        rounded
        @click.stop="$store.commit('dashboardTop/setModal', {modalType: 'addingPeople', to: true} )"
      >
        (+) Add People
      </v-btn>
    </v-col>
    <AddPeople />
  </v-row>
</template>

<script>
import DashboardTopCard from '~/components/dashboard/DashboardTop/DashboardTopCard'
import AddPeople from '~/components/dashboard/DashboardTop/AddPeople'
export default {
  components: {
    DashboardTopCard,
    AddPeople
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles';
.dashboard-top {
  @include large('down') {
    flex-wrap: wrap !important;
    justify-content: center !important;
  }
}
.dashboard-top__buttons {
  @include large('down') {
    width: 350px;
    text-align: center;
    margin-top: 10px;
  }
}
</style>
