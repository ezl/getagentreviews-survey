<template>
  <div class="d-flex justify-center connector1">
    <img style="max-width: 100%; position: absolute; bottom: -85px" width="583px" src="@/assets/line1.png" alt="connector">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '~/styles';
.connector1 {
    position: relative; height: 60px;
    @include xlarge("down") {
        display: none;
        height: 0;
        img {
            display: none;
        }
    }
}
</style>
