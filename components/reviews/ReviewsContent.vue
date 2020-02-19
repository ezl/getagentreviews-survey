<template>
  <div class="ratings__content">
    <div>
      <span class="ratings__top-icon">
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
.ratings__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  right: 10%;
  margin-top: 50px;
  span {
    margin-top: 25px;
  }
}
.ratings__top-icon {
  font-size: 40px;
}
.button--purple {
  width: 40%;
  border-radius: 80px;
}
</style>
