<template>
  <div>
    <v-dialog
      v-model="show"
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
              @change="getData"
            >
          </label>
          <v-btn
            color="primary"
            text
            @click.stop="$store.commit('dashboardTop/setModal', {modalType: 'manualAdd', to: true})"
          >
            Add Manually
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <AddManually />
  </div>
</template>

<script>
import * as d3 from 'd3'
import AddManually from '~/components/dashboard/DashboardTop/AddManually'
export default {
  components: {
    AddManually
  },
  computed: {
    show: {
      get () {
        return this.$store.state.dashboardTop.modal.addingPeople
      },
      set (value) {
        if (!value) {
          this.$store.commit('dashboardTop/setModal', { modalType: 'addingPeople', to: false })
        }
      }
    }
  },
  methods: {
    getData (e) {
      let file = null
      const fileList = Array.prototype.slice.call(e.target.files)

      fileList.forEach((f) => {
        const reader = new FileReader()
        const vm = this

        reader.onload = function (e) {
          file = e.target.result
          d3.csv(file, (client) => {
            console.log(client)
            vm.addClient(client.name, client.email)
          })
        }
        reader.readAsDataURL(f)
      })
    },
    addClient (name, email) {
      this.$store.dispatch('clients/addClient', { name, email })
    }
  }
}
</script>

<style>

</style>
