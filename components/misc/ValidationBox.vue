<template>
  <div>
    <div v-if="message.length" class="validation-box">
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
    }
  }
}
</script>

<style>
.validation-box {
  border: solid 1px #ffc40b;
  background-color: #fff3cd;
  display: inline-block;
  padding: 8px;
}
</style>
