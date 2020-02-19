<template>
  <div class="reviews__content">
    <div>
      <span class="reviews__top-icon">
      <slot name="top-icon" />
      </span>
      <span class="d-block text-purple"><slot name="title"/></span>
      <span class="d-block">
        <slot name="subtitle" />
      </span>
      <slot name="body" />
      <button v-if="includeButton" @click="buttonCTA" class="button button--purple">
        {{ buttonTitle }}
      </button>
      <slot name="extra-content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttonTitle: {
      type: String,
      default: ''
    },
    includeButton: {
      type: Boolean,
      default: true
    },
    buttonCTA: {
      type: Function,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">

</style>
