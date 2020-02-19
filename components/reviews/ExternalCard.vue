<template>
  <div
    @click="$store.commit('reviews/setLeftFeedBackExternal')"
    class="external-feedback__card center-flex-v-h"
  >
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style>
.external-feedback__card {
  background-color: white;
  padding: 20px;
  width: 150px;
  border-radius: 3px;
  box-shadow: 2px 3px;
  cursor: pointer;
}
</style>
