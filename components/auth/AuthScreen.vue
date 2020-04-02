<template>
  <div class="auth-screen d-flex">
    <div class="auth-screen__img">
      <img
        src="@/assets/reviewbg.png"
        alt=""
      >
    </div>
    <div class="auth-screen__container mt-4">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default'
}
</script>

<style lang="scss" scoped>
@import '~/styles/';
.auth-screen {
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  @include large('up') {
    justify-content: space-between;
  }
}
.auth-screen__container {
  @include large('up') {
    margin-right: 20%;
  }
  @include xxxlarge("up") {
    margin-right: 25%;
  }
}
.auth-screen__img {
  flex-basis: 100%;
  @include xlarge("down") {
    align-self: center;
  }
  @include large('up') {
    flex-basis: 46%;
  }
  @include xlarge("up") {
    flex-basis: 42%;
  }
  @include xxxlarge("up") {
    flex-basis:38%;
  }
  @include query($screen-md, $screen-sm, "down") {
        flex-basis: 80%;
    }
  img {
    width: 100%;
    @include xlarge("up") {
    max-height: 99vh;
  }
  }
}
</style>
