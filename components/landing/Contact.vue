<template>
  <div class="home__contact">
    <v-container class="d-flex justify-lg-space-between">
      <img src="@/assets/contactperson.png" alt="title">
      <div class="home__contact-form">
        <span class="d-block text-purple text-center">CONTACT US</span>
        <h2 class="text-center mb-7">
          Let us know if you have any questions -- we'll get back to you ASAP!
        </h2>
        <form>
          <div class="d-flex justify-space-between">
            <ValidationInput placeholder="First Name" label="First Name" input-styles="width: 220px;" />
            <ValidationInput placeholder="Last Name" label="Last Name" input-styles="width: 220px;" />
          </div>
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
  </div>
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
input {
  display: inline;
}
.home__contact-form {
  width: 40%;
  margin-right: 100px;
}
</style>
