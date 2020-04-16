<template>
  <div class="d-flex justify-center connector2">
    <img style="max-width: 100%; position: absolute; bottom: -30px" width="583px" src="@/assets/line2.png" alt="connector">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '~/styles';
.connector2 {
    position: relative; height: 125px;
    @include xlarge("down") {
        display: none;
        height: 0;
        img {
            display: none;
        }
    }
}
</style>
