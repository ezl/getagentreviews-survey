<template>
  <div class="reviews__content">
    <div v-if="includeTitle" class="reviews__content-title-image">
    <img src="@/assets/title.png" alt="title">
    </div>
    <div class="reviews__content__body">
      <span class="reviews__top-icon">
        <slot name="top-icon" />
      </span>
      <span class="d-block text-purple"><slot name="title" /></span>
      <span class="d-block">
        <slot name="subtitle" />
      </span>
      <slot name="body" />
      <button v-if="includeButton" class="button button--purple" @click="buttonCTA">
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
    includeTitle: {
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

<style lang="scss" scoped>
.reviews__content-title-image {
  display: flex;
  justify-content: center;
  position: relative;
  margin-bottom: 35px;
  img {
    width: 160px;
  }
}
</style>
