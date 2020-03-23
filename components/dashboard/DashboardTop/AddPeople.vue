<template>
  <v-dialog
    v-model="addingPeople"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Add People
      </v-card-title>

      <v-card-actions class="d-flex justify-center">
        <label
          class="default-file-upload"
          for="image"
        >
          Upload CSV
          <input
            id="image"
            placeholder="Upload Image"
            type="file"
            name="image"
          >
        </label>
        <v-btn
          color="primary"
          text
          @click.stop="modal = 'manualAdd'"
        >
          Add Manually
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      modal: null,
      addingPeople: false
    }
  },
  watch: {
    modal (newModal, oldModal) {
      this.$store.commit('dashboardTop/setModal', this.modal)
    }
  },
  mounted () {
    this.addingPeople = this.$store.state.dashboardTop.modal.addingPeople
  },
  methods: {
    setModal () {

    }
  }
}
</script>

<style>

</style>
