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
  <div>
    footer
  </div>
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

</style>
