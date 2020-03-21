<template>
  <v-app>
    <div class="auth-dashboard">
      <div>
        <Drawer />
      </div>
      <div>
        <DashboardTop />
        <nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
import Drawer from '~/components/dashboard/Drawer'
import DashboardTop from '~/components/dashboard/DashboardTop'
export default {
  components: {
    Drawer,
    DashboardTop
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
    display: grid;
    grid-template-columns: 13% 87%;
    @include lato();
}
</style>
