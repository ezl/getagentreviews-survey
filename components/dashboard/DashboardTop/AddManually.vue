<template>
  <v-dialog
    v-model="show"
    width="500"
  >
    <v-card>
      <ClientForm />
    </v-card>
  </v-dialog>
</template>

<script>
import ClientForm from '~/components/dashboard/ClientForm'
export default {
  components: {
    ClientForm
  },
  computed: {
    show: {
      get () {
        return this.$store.state.dashboardTop.modal.manualAdd
      },
      set (value) {
        if (!value) {
          this.$store.commit('dashboardTop/setModal', { modalType: 'manualAdd', to: false })
        }
      }
    }
  }
}
</script>

<style>

</style>
