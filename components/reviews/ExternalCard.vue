<template>
<!-- leftFeedBackExternal maybe shouldn't trigger until use clicks a next button? That way they can set feedback on multiple external websites -->
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

<style lang="scss">

</style>
