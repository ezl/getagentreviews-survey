<template>
  <v-dialog
    v-model="show"
    width="500"
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Add Form
      </v-card-title>
      <v-col>
        <ClientForm />
      </v-col>
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
