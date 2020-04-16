<template>
  <h1 class="landing__circled">
    {{ number }}
  </h1>
</template>

<script>
export default {
  props: {
    number: {
      type: [String, Number],
      default: 1
    }
  }
}
</script>

<style scoped>
.landing__circled {
  color: #4050B2;
  background-color: #EEEEFA;
  display: inline-flex;
  height: 66px;
  width: 66px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
}
</style>
