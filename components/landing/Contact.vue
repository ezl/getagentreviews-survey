<template>
  <v-container class="d-flex justify-lg-space-between home__contact">
    <img src="@/assets/contactperson.png" alt="title">
    <div class="home__contact-form">
      <span class="d-block text-purple text-center">CONTACT US</span>
      <h2 class="text-center mb-7">
        Let us know if you have any questions -- we'll get back to you ASAP!
      </h2>
      <form>
        <v-row no-gutters justify="space-between">
          <v-col class="mr-1">
            <ValidationInput input-classes="w-100" placeholder="First Name" label="First Name" input-styles="width: 100%" />
          </v-col>
          <v-col>
            <ValidationInput input-classes="w-100" placeholder="Last Name" label="Last Name" input-styles="width: 100%" />
          </v-col>
        </v-row>
        <ValidationInput placeholder="Email" label="Email" input-styles="width: 100%;" />
        <ValidationInput placeholder="Message" label="Your Message" input-styles="width: 100%;" />
        <div class="text-center">
          <button class="button button--landing mt-4">
            Send
          </button>
        </div>
      </form>
    </div>
  </v-container>
</template>

<script>
import ValidationInput from '~/components/common/ValidationInput'
export default {
  components: {
    ValidationInput
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles';
input {
  display: inline;
}
.home__contact {
  @include large("down") {
    flex-wrap: wrap;
    justify-content: center;
  }
}
.home__contact-form {
  width: 40%;
  margin-right: 100px;
  @include large("down") {
    width: 60%;
    margin-right: 0;
    @include small("down") {
      width: 100%;
    }
  }
}
img {
  max-width: 100%;
  @include xlarge("down") {
    margin-right: 8px;
  }
}
</style>
