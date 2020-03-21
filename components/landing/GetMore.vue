<template>
  <div class="home__get-more d-flex justify-space-between w-100">
    <div class="home__get-more-cta align-self-center">
      <h1>Get More 5 Star Reviews Online</h1>
      <p>We make it simple and automatic for you to keep getting more 5 star reviews on Zillow, Yelp, or Google.</p>
      <button class="button button--landing">
        Get Started Now
      </button>
      <div class="mt-8">
        <span class="grey--text ligthen-1">Get Reviews on</span>
        <div class="home__get-more-logos d-flex">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Google_wordmark.svg/800px-Google_wordmark.svg.png"
            alt="google"
          >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Zillow_logo19.png"
            alt="zillow"
          >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Yelp_Logo.svg/1280px-Yelp_Logo.svg.png"
            alt="yelp"
          >
        </div>
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
    height: 800px;
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
  margin-left: 120px;
  @include xxlarge {
    margin-left: auto;
  }

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
.home__get-more-logos {
  margin-top: 5px;
  img {
    width: 65px;
    margin: 0 9px;
  }
}
</style>
