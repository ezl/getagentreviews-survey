<template>
  <v-card
    min-height="100vh"
    class="drawer"
    width="100%"
    height="100%"
  >
    <v-navigation-drawer
      permanent
      class="drawer"
    >
      <v-list-item>
        <v-list-item-content>
          <img
            class="d-block mx-auto mb-3"
            :src="user ? user.profile.image : '#'"
            :alt="user ? user.name : ''"
          >
          <span class="text-purple text-center">{{ user ? user.name : '' }}</span>
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
          <nuxt-link :to="route.action ? route.action : '#'">
            <v-icon
              class="mr-2 drawer-link"
              @click="route.name === 'Sign Out' ? logout() : ''"
            >
              {{ route.icon }}
            </v-icon>
            <span
              class="drawer-link"
              @click="route.name === 'Sign Out' ? logout() : ''"
            >
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
  props: {
    mobile: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.auth.user
    },
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
.drawer {
  width: 188px;
  @include medium("down") {
    width: 250px;
  }
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
.drawer.v-card {
  @include small("down") {

    display: none;
  }
}
</style>
