<template>
  <div
    @click="externalSubmit"
    class="external-feedback__card center-flex-v-h"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  methods: {
    externalSubmit () {
      this.$store.commit('reviews/setLeftFeedBackExternal', this.location)
    }
  }
}
</script>

<style lang="scss">
</style>
