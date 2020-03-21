<template>
  <v-card
    height="100vh"
    width="188"
    class="mx-auto drawer"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <img
            class="d-block mx-auto mb-3"
            :src="$store.state.auth.user.profile.image"
            :alt="$store.state.auth.user.name"
          >
          <span class="text-purple">{{ $store.state.auth.user.name }}</span>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list
        dense
        nav
      >
        <div
          v-for="route in routes"
          :key="route.name"
        >
          <nuxt-link :to="route.action">
            <v-icon class="mr-2 drawer-link">
              {{ route.icon }}
            </v-icon>
            <span class="drawer-link">
              {{ route.name }}
            </span>
          </nuxt-link>
        </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
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
.drawer {
  i {
    color: lighten($purple, 11%);
  }
}
img {
  width: 76px;
  border-radius: 10px;
}
a {
  display: inline-block;
  margin-bottom: 25px;
  color: lighten($purple, 14%);
  transition: color $default-timing;
  &:hover {
      color: $purple;
      i {
          color: $purple;
      }
  }
}

.nuxt-link-exact-active.nuxt-link-active {
  color: $purple;
  i {
    color: $purple;
  }
}
</style>
