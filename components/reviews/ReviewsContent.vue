<template>
  <div class="ratings__content">
    <div>
      <slot name="icon" />
      <span class="d-block text-purple"><slot name="title"/></span>
      <span class="d-block">
        <slot name="subtitle" />
      </span>
      <slot name="body" />
      <button @click="buttonCTA" class="button button--purple">
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
</style>
