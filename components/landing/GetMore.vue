<template>
  <div>
    <div
      id="get-more"
      class="home__get-more d-flex justify-space-between w-100"
    >
      <div class="home__get-more-cta align-self-center">
        <h1>Get More 5 Star Reviews Online</h1>
        <div class="ml-1 mr-1 ml-sm-0 mr-sm-0">
          <p>We make it simple and automatic for you to keep getting more 5 star reviews on Zillow, Yelp, or Google.</p>
        </div>
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
              class="get-more__icons"
            >
              <img
                style="height: width: 85px; height: 28px;"
                src="@/assets/google.png"
                alt="google"
              >
              <img
                style="height: width: 96px; height: 20px;"
                src="@/assets/zillow.png"
                alt="zillow"
              >
              <img
                src="@/assets/yelp.png"
                alt="yelp"
              >
            </v-row>
          </v-container>
        </div>
      </div>
      <div class="home__get-more-image">
        <img
          src="@/assets/reviewbg.png"
          alt="title"
        >
      </div>
    </div>
    <img src="https://s3-prod.adage.com/s3fs-public/styles/width_1024/public/20190530_iStock-1031924616.jpg" class="get__more-mobile-image" alt="">
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
  @include large('down') {
    text-align: center;
    justify-content: center;
    flex-wrap: wrap-reverse;
    height: auto;
    margin-top: 50px;
  }
  @include xlarge('down') {
    height: auto;
  }
}
.home__get-more-image {
  position: relative;
  img {
    @include xlarge('down') {
      width: 632px;
    }
  }

  @include large('down') {
    display: none;
  }
}
.home__get-more-cta {
  margin-left: 120px;
  @include large('down') {
    margin: 0 auto !important;
  }
  @include xlarge('down') {
    font-size: 15px;
    margin-left: 2em;
  }
  @include xxlarge {
    margin-left: 60px;
  }

  h1,
  p {
    width: 90%;
    @include large('down') {
      width: 100%;
    }
    @include xxlarge {
      width: 90%;
    }
    @include xxxlarge {
      width: 100%;
    }
  }
  h1 {
    color: $purple;
    font-family: 'serif';
    font-size: 1.85em;
    @include medium("down") {
      font-size: 1.5em;
    }
  }
  p {
    color: $purple;
    font-weight: 50;
  }
}
.get-more__icons {
  @include large("down") {
    justify-content: center !important;
  }
}
.get__more-mobile-image {
  width: 100%;
  display: none;
  @include large("down") {
    display: block;
  }
}
</style>
