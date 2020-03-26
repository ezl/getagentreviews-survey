<template>
  <v-bottom-navigation active-class="active-bottom" fixed>
    <v-btn
      v-for="route in routes"
      :key="route.name"
      exact
      exact-active-class="active-bottom"
      :to="route.action ? route.action : ''"
      @click="route.name === 'Sign Out' ? logout() : ''"
    >
      <span>{{ route.name }}</span>
      <v-icon>{{ route.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    routes () {
      return this.$store.state.navigation.dashboardRoutes
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

.active-bottom {
  color: $purple !important;
  background-color: orange;
}
.v-btn.v-btn--contained {
  min-width: 0px;
}
.v-bottom-navigation.v-item-group.theme--light {
  @include small("up") {
    display: none;
  }
}
</style>
