<template>
  <div class="home__get-more d-flex justify-space-between w-100">
    <div class="home__get-more-cta align-self-center">
      <h1>Get More 5 Star Reviews Online</h1>
      <p>We make it simple and automatic for you to keep getting more 5 star reviews on Zillow, Yelp, or Google.</p>
      <nuxt-link to="/register">
        <button class="button button--landing">
          Get Started Now
        </button>
      </nuxt-link>
      <div class="mt-8">
        <span class="grey--text ligthen-1">Get Reviews on</span>
        <v-row no-gutters class="home__get-more-logos">
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
        </v-row>
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
    @include large("down") {
      text-align: center;
      justify-content: center;
      flex-wrap: wrap-reverse;
      height: auto;
      margin-top: 50px;
    }
}
.home__get-more-image {
  position: relative;
  @include large("down") {
    display: none;
  }
}
.home__get-more-cta {
  margin-left: 120px;
  @include large("down") {
    margin: 0 auto;
  }
  @include xxlarge {
    margin-left: auto;
  }

    h1, p {
        width: 59%;
        @include large("down") {
          width: 100%;
        }
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
  @include large("down") {
    justify-content: center;
    margin-bottom: 30px;
  }
  margin-top: 5px;
  img {
    max-width: 65px;
    margin: 0 9px;
  }
}
</style>
