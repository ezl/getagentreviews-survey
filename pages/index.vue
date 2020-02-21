<template>
  <div class="container">
    <div class="idk" style="height: 20vh;"></div>
    <Ratings />
  </div>
</template>

<script>
import Ratings from '@/components/reviews/Reviews'
export default {
  components: {
    Ratings
  },
  mounted() {
    console.log(this.$url)
    const params = window.location.search.slice(1)
                      .split('&')
                      .reduce(function _reduce (/*Object*/ a, /*String*/ b) {
                        b = b.split('=');
                        a[b[0]] = decodeURIComponent(b[1]);
                        return a;
                      }, {});
    const data = params.rating.split('-')
    if (data.length) {
      this.$store.commit('reviews/setChosen', data[0])
      this.$store.dispatch('auth/getUser', data[1])
      this.$store.dispatch('reviews/getAgent', data[2])
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
