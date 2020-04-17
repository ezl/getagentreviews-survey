<template>
  <div id="get-more" class="home__get-more d-flex justify-space-between w-100">
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
        <v-container>
          <v-row
            justify-xl="start"
            justify-lg="start"
            justify-md="start"
            justify="center"
            align="center"
          >
            <img style="height: width: 85px; height: 28px;" src="@/assets/google.png" alt="google">
            <img style="height: width: 96px; height: 20px;" src="@/assets/zillow.png" alt="zillow">
            <img
              src="@/assets/yelp.png"
              alt="yelp"
            >
          </v-row>
        </v-container>
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
    height: 900px;
    @include large("down") {
      text-align: center;
      justify-content: center;
      flex-wrap: wrap-reverse;
      height: auto;
      margin-top: 50px;
    }
     @include xlarge("down") {
    height: auto;
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
    margin: 0 auto !important;
  }
  @include xlarge("down") {
    font-size: 15px;
    margin-left: 2em;
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
  img {
    // width: 96px;
    // height: 20px;
    // margin: 0 9px;
  }
}
</style>
