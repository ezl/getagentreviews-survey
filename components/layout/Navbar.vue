<template>
  <div class="navbar">
    <v-app-bar
      :color="`${navbarColor} accent-4`"
      dense
      :fixed="scrolledEnough ? true : false"
      :absolute="!scrolledEnough ? true : false"
      class="nav-reset"
      :class="scrolledEnough ? 'slide-down' : ''"
    >
      <!-- <v-app-bar-nav-icon /> -->
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
        :to="route.action && route.action"
        :color="route.color"
        :style="`background-color: ${route.bgColor}`"
        :rounded="route.rounded ? true : false"
        :elevation="route.rounded ? 24 : 0"
      >
        {{ route.name }}
      </v-btn>
      <v-btn v-if="$store.state.auth.user" text @click="logout">
        Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      scrollPosition: 0
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
    }
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
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
.slide-down {
  animation: slide-down .4s;
}

</style>
