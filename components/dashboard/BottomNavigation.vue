<template>
  <v-bottom-navigation active-class="active-bottom" fixed>
    <v-btn v-for="route in routes" :key="route.name" exact exact-active-class="active-bottom" :to="route.action">
      <span>{{ route.name }}</span>
      <v-icon>{{ route.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
    return {
      routes: [
        { name: 'People', action: '/dashboard', icon: 'mdi-account' },
        { name: 'Reviews', action: '/dashboard/reviews', icon: 'mdi-account' },
        { name: 'Feedback', action: '/dashboard/feedback', icon: 'mdi-account' },
        { name: 'Settings', action: '/dashboard/settings', icon: 'mdi-account' },
        { name: 'Sign Out', action: '/dashboard/people', icon: 'mdi-account' }
      ]
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
