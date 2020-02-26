<template>
  <div class="auth-screen d-flex justify-end align-center">
    <div class="auth-screen__container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '~/styles/';
.auth-screen {
    // background-color: $purple;
    height: 100%;
}
.auth-screen__container {
  margin-right: 100px;
}
</style>
