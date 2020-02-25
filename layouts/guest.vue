<template>
  <div class="navgation">
      <template v-if="$store.state.auth.user">Hello {{$store.state.auth.user.name}}</template>
      <nuxt-link>Profile</nuxt-link>
      <nuxt />
      <footer class="footer">
          myfooter
      </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>