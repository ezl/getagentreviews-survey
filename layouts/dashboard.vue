<template>
  <v-app>
    <div class="auth-dashboard">
      <div>
        <Drawer />
      </div>
      <div>
        <nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
import Drawer from '~/components/dashboard/Drawer'
export default {
  components: {
    Drawer
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

<style scoped>
.auth-dashboard {
    display: grid;
    grid-template-columns: 13% 87%;
}
</style>
