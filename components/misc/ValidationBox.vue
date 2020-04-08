<template>
  <div>
    <div v-if="message.length" class="validation-box" :class="!width ? 'w-100' : ''" :style="width ? `width: ${width}` : ''">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style>
.validation-box {
  border: solid 1px #ff6c7f;
  background-color: #f9d7da;
  display: inline-block;
  padding: 10px;
  font-size: 13px;
  text-align: center;
  color: #6d151d;
  font-weight: bold;
}
</style>
