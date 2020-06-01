<template>
  <div class="auth-screen">
    <v-container no-gutters>
      <v-row justify="center" justify-md="space-between">
        <v-col class="pt-md-0 d-none d-md-block" md="10" lg="8" xl="7">
          <img
            style="width: 100%; max-height: 100vh;"
            src="@/assets/authimg.png"
            alt="img"
          >
        </v-col>
        <v-col
          class="align-self-xl-center mb-xl-10"
          cols="12"
          sm="5"
          md="2"
          lg="3"
          xl="4"
        >
          <slot />
        </v-col>
      </v-row>
    </v-container>
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
  overflow-y: hidden;
}
</style>
