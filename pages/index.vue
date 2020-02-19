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
