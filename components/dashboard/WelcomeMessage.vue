<template>
  <v-dialog
    v-model="message"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Welcome!
        <v-spacer />
        <v-btn icon @click="message= '' ">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="subtitle-1 black--text mt-3">
        {{ message }}
      </v-card-text>

      <v-divider />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    message: {
      get () {
        return this.$store.state.auth.message
      },
      set (val) {
        this.$store.commit('auth/setMessage', val)
      }
    }
  },
  mounted () {
    console.log(this.$store.state.auth.message)
  }
}
</script>

<style>

</style>
