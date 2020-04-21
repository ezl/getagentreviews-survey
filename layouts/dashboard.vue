<template>
  <v-app>
    <WelcomeMessage />
    <div class="auth-dashboard auth-dashboard__grid">
      <div>
        <Drawer />
      </div>
      <BottomNavigation />
      <div>
        <div>
          <DashboardTop />
        </div>
        <nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
import Drawer from '~/components/dashboard/Drawer'
import BottomNavigation from '~/components/dashboard/BottomNavigation'
import DashboardTop from '~/components/dashboard/DashboardTop'
import WelcomeMessage from '~/components/dashboard/WelcomeMessage'
export default {
  components: {
    Drawer,
    DashboardTop,
    BottomNavigation,
    WelcomeMessage
  },
  data () {
    return {

    }
  },
  middleware: 'authed',
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
    grid-template-columns: 11% 89%;
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
