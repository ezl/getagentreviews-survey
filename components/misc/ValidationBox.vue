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
  border: solid 1px #ff6c7f;
  background-color: #f9d7da;
  display: inline-block;
  padding: 10px;
  font-size: 13px;
  width: 100%;
  text-align: center;
  color: #6d151d;
  font-weight: bold;
}
</style>
