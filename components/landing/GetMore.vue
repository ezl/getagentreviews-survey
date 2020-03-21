<template>
  <div class="home__get-more d-flex justify-space-between w-100">
    <div class="home__get-more-cta align-self-center">
      <h1>Get More 5 Star Reviews Online</h1>
      <p>We make it simple and automatic for you to keep getting more 5 star reviews on Zillow, Yelp, or Google.</p>
      <button class="button button--landing">
        Get Started Now
      </button>
      <div>
        <span>Get Reviews on</span>
        <h2>Google Google Google</h2>
      </div>
    </div>
    <div class="home__get-more-image">
      <img src="@/assets/reviewbg.png" alt="title">
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '~/styles';

.home__get-more {
    height: 899px;
}
.home__get-more-image {
    // width: 55%;
    // position: relative;
    // img {
    //     position: absolute;
    //     top: -2%;
    //     left: 20%;
    // }
}
.home__get-more-cta {
    h1, p {
        width: 59%;
    }
    h1 {
        color: $purple;
    }
    p {
        color: $purple;
        font-weight: 50;
    }
}
</style>
