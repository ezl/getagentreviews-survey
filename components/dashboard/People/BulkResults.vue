<template>
  <v-dialog
    v-model="bulkResolved"
    width="500"
  >
    <v-card class="pb-1">
      <v-toolbar class="mb-2" dark elevation="0">
        <v-toolbar-title>Results</v-toolbar-title>

        <v-spacer />
        <v-btn icon @click="bulkResolved = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <template v-if="success.length">
        <v-card-text class="headline text-center green--text">
          Successful
        </v-card-text>
        <v-list-item v-for="email in success" :key="email">
          <v-list-item-content>
            {{ email }}
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon color="green">
              fas fa-check
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider />
      </template>
      <template v-if="failed.length">
        <v-card-text class="headline text-center red--text">
          Failed
        </v-card-text>
        <v-list-item v-for="email in failed" :key="email">
          <v-list-item-content>
            {{ email }}
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon color="red">
              fas fa-exclamation-triangle
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider />
        <v-card-text class="text-center">
          These emails likely don't exist
        </v-card-text>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  computed: {
    failed () {
      return this.$store.state.reviews.sending.failed
    },
    success () {
      return this.$store.state.reviews.sending.success
    },
    bulkResolved: {
      get () {
        return this.$store.state.reviews.sending.bulkResolved
      },
      set (value) {
        this.$store.commit('reviews/setSending', { bulkResolved: false })
      }
    }
  }
}
</script>

<style>

</style>
