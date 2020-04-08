<template>
  <v-dialog
    v-model="show"
    width="1000"
  >
    <v-card>
      <v-container>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Column Matching
        </v-card-title>
        <h1 class="text-center">
          If any of the coliumns are incorrect, please reassign
        </h1>
        <v-row justify="center">
          <MatchColumn v-for="(item, i) in data" :key="i" :matches="matches" :data="item" />
        </v-row>
        <div class="text-center">
          <v-btn @click="addClients" color="success">
            Add Clients
          </v-btn>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import MatchColumn from '~/components/dashboard/DashboardTop/MatchColumn'
export default {
  components: {
    MatchColumn
  },
  props: {
    data: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      matches: []
    }
  },
  computed: {
    show: {
      get () {
        return this.$store.state.dashboardTop.modal.csvMatch
      },
      set (value) {
        if (!value) {
          this.$store.commit('dashboardTop/setModal', { modalType: 'csvMatch', to: false })
        }
      }
    }
  },
  methods: {
    addClients () {
      this.$store.dispatch('dashboardTop/csvAdd')
      // this.$store.dispatch('clients/addClient', { name: this.name, email: this.email })
    }
  }
}
</script>

<style>

</style>
