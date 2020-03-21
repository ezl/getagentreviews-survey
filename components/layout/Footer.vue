<template>
  <!-- <v-footer
    absolute="false"
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-row>
  </v-footer> -->
  <v-container>
    <div class="footer">
      <v-divider class="mx-4 mb-4" />
      <div class="d-flex justify-space-between">
        <div>
          <span>About us</span>
          <span>FAQ</span>
          <span>Terms & Conditions</span>
          <span>Privacy</span>
        </div>
        <div>
          <span>Copyright @Agent Reviews 2019</span>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      links: ['About', 'Contact', 'Some other link']
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  color: rgb(156, 155, 155);
}
span {
  margin: 0 8px;
}
</style>
