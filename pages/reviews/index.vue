<template>
  <div class="container">
    <div
      class="idk"
      style="height: 20vh;"
    />
    <Ratings v-if="loaded" />
    <span v-else>Loading...</span>
  </div>
</template>

<script>
import Ratings from '@/components/reviews/Reviews'
export default {
  components: {
    Ratings
  },
  computed: {
    loaded () {
      return this.$store.state.reviews.chosen && this.$store.state.auth.email && this.$store.state.reviews.agent
    }
  },
  mounted () {
    // console.log(this.$url)
    const checkParamsExist = window.location.search.slice(1)
    if (checkParamsExist) {
      const params = checkParamsExist
        .split('&')
        .reduce(function _reduce (/* Object */ a, /* String */ b) {
          b = b.split('=')
          a[b[0]] = decodeURIComponent(b[1])
          return a
        }, {})
      console.log(params)
      if (params) {
        const data = params.rating.split('-')
        if (data.length) {
          this.$store.commit('reviews/setChosen', data[0])
          this.$store.dispatch('auth/getEmail', data[1])
          this.$store.dispatch('reviews/getAgent', data[2])
        }
      }
    }
  }
}
</script>

<style>
.title {
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.links {
  padding-top: 15px;
}
</style>
