<template>
  <v-app>
    <div class="auth-dashboard auth-dashboard__grid">
      <div>
        <Drawer />
      </div>
      <BottomNavigation />
      <div class="ml-3">
        <DashboardTop />
        <nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
import Drawer from '~/components/dashboard/Drawer'
import BottomNavigation from '~/components/dashboard/BottomNavigation'
import DashboardTop from '~/components/dashboard/DashboardTop'
export default {
  components: {
    Drawer,
    DashboardTop,
    BottomNavigation
  },
  data () {
    return {

    }
  },
  methods: {
    logout () {
      return this.$store.dispatch('auth/logout', this.$cookiz.get('auth-token'))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles';
.auth-dashboard {
    @include lato();
}

.auth-dashboard__grid {
  display: grid;
  @include xlarge("up") {

    grid-template-columns: 11% 99%;
  }
    grid-template-columns: 12% 88%;
    @include large("down") {
    grid-template-columns: 25% 75%;
    }
    @include small("down") {
      display: block;
    }
}

</style>
