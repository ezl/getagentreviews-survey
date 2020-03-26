<template>
  <div class="navbar">
    <Drawer />
    <v-app-bar
      :color="`${navbarColor} accent-4`"
      dense
      :fixed="scrolledEnough ? true : false"
      :absolute="!scrolledEnough ? true : false"
      class="nav-reset"
      :class="scrolledEnough ? 'slide-down' : ''"
    >
      <v-icon color="#6b79ed" @click="$store.commit('navigation/setDrawer', !$store.state.navigation.drawer)">
        mdi-menu
      </v-icon>
      <nuxt-link to="/" style="color: white;">
        <v-toolbar-title class="ml-5">
          <img width="120" src="@/assets/title.png" alt="title">
        </v-toolbar-title>
      </nuxt-link>
      <v-spacer />

      <v-btn
        v-for="route in routes"
        :key="route.name"
        nuxt
        text
        class="navbar__desktop-link"
        :to="route.action && route.action"
        :color="route.color"
        :style="`background-color: ${route.bgColor}`"
        :rounded="route.rounded ? true : false"
        :elevation="route.rounded ? 24 : 0"
        @click="route.name === 'Logout' ? logout() : ''"
      >
        {{ route.name }}
      </v-btn>
      <!-- <v-btn v-if="$store.state.auth.user" text @click="logout">
        Logout
      </v-btn> -->
    </v-app-bar>
  </div>
</template>

<script>
import Drawer from '~/components/layout/Drawer'
export default {
  components: {
    Drawer
  },
  data () {
    return {
      scrollPosition: 0,
      drawer: true
    }
  },
  computed: {
    scrolledEnough () {
      if (this.scrollPosition > 80) {
        return true
      }
      return false
    },
    navbarColor () {
      if (!this.scrolledEnough) {
        return 'transparent'
      }
      return 'black'
    },
    routes () {
      return this.$store.getters['navigation/routes']
    }
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
    this.scrollPosition = window.scrollY
  },
  methods: {
    logout () {
      return this.$store.dispatch('auth/logout', this.$cookiz.get('auth-token'))
    },
    updateScroll () {
      this.scrollPosition = window.scrollY
    }

  }
}
</script>

<style lang="scss" scoped>
@import '~/styles';
.nav-reset {
  .v-btn {
    color: $purple;
    font-size: 14px;
    margin: 0 1em;
    text-transform: capitalize;
  }
  box-shadow: none;
}
.navbar__desktop-link {
  @include large("down") {
      display: none;
    }
}
.slide-down {
  animation: slide-down .4s;
}
.mdi.mdi-menu.theme--light {
  display: none;
  @include large("down") {
    display: inline-block
  }
}
</style>
