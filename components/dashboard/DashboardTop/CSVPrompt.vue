<template>
  <v-dialog v-model="show" width="400">
    <v-card class="text-center pt-5">
      <v-card-text class="headline black--text">
        <template v-if="!answer">
          Does your csv include headers?
          <v-card-actions class="d-flex justify-center">
            <v-btn dark color="green" @click="$emit('answer', 'yes')">
              Yes
            </v-btn>
            <v-btn dark color="red" @click="$emit('answer', 'no')">
              No
            </v-btn>
            <v-btn dark @click="$emit('answer', 'idk')">
              I don't know
            </v-btn>
          </v-card-actions>
        </template>
        <template v-else>
          Choose your CSV
          <v-file-input accept="csv" chips :label="`Choose CSV(headers:${answer})`" @change="file = $event" />
          <v-btn v-if="file" color="success" @click="$emit('getData', file)">
            Upload
          </v-btn>
          <v-btn color="primary" @click="$emit('answer', '')">
            Go Back
          </v-btn>
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    answer: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      file: null
    }
  },
  computed: {
    show: {
      get () {
        return this.$store.state.dashboardTop.modal.csvPrompt
      },
      set (value) {
        if (!value) {
          this.$store.commit('dashboardTop/setModal', { modalType: 'csvPrompt', to: false })
        }
      }
    }
  }
}
</script>

<style>

</style>
