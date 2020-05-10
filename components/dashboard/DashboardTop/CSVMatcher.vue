<template>
  <v-dialog
    v-model="show"
    width="1000"
  >
    <v-snackbar v-if="errors && errors.type === 'csvError'" v-model="errors" top :time="2000">
      {{ errors.text }}
      <v-btn color="red" text @click="errors = ''">
        Close
      </v-btn>
    </v-snackbar>
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Column Matching
      </v-card-title>
      <v-container>
        <h1 class="text-center">
          If any of the columns are incorrect, please reassign
        </h1>
        <!-- <div class="text-center">
          <ValidationBox v-if="errors" width="70%" :message="errors.text" />
        </div> -->
        <v-row v-if="data" justify="center">
          <MatchColumn v-for="(item, i) in data" :key="i" :matches="matches" :data="item" @setErrors="getErrors" />
        </v-row>
      </v-container>
      <v-app-bar class="d-flex justify-center" dark style="position: sticky; bottom: 0%;" dense>
        <v-btn v-if="!columnErrors" text @click="addClients">
          Add Clients
        </v-btn>

        <v-btn text @click="$store.commit('dashboardTop/setModal', { modalType: 'csvMatch', to: false }), $store.commit('dashboardTop/setModal', { modalType: 'csvPrompt', to: true })">
          Go Back
        </v-btn>
        <v-btn text @click="$store.commit('dashboardTop/setModal', { modalType: 'csvMatch', to: false })">
          Cancel
        </v-btn>
      </v-app-bar>
    </v-card>
  </v-dialog>
</template>

<script>
import MatchColumn from '~/components/dashboard/DashboardTop/MatchColumn'
// import ValidationBox from '~/components/misc/ValidationBox'
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
      matches: [],
      columnErrors: false
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
    },
    errors: {
      get () {
        return this.$store.state.dashboardTop.errors
      },
      set (val) {
        this.$store.commit('dashboardTop/setErrors', { type: '', text: '' })
      }
    }
  },
  methods: {
    addClients () {
      this.$store.dispatch('dashboardTop/csvAdd')
      this.$store.commit('dashboardTop/setModal', { modalType: 'addingPeople', to: false })
      this.$store.commit('dashboardTop/setModal', { modalType: 'csvPrompt', to: false })
      // this.$store.commit('dashboardTop/setModal', { modalType: 'csvMatch', to: false })
    },
    getErrors (bool) {
      this.columnErrors = bool
    }
  }
}
</script>

<style>

</style>
