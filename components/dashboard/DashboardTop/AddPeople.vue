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
          <v-btn dark @click="csvOptions = true" @click.stop="$store.commit('dashboardTop/setModal', {modalType: 'csvPrompt', to: true})">
            Upload CSV
          </v-btn>
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
    <CSVPrompt :answer="answer" @getData="getData" @answer="setAnswer" />
    <CSVMatcher :data="data" />
  </div>
</template>

<script>
import Papa from 'papaparse'
import CSVMatcher from '~/components/dashboard/DashboardTop/CSVMatcher'
import CSVPrompt from '~/components/dashboard/DashboardTop/CSVPrompt'
import AddManually from '~/components/dashboard/DashboardTop/AddManually'
export default {
  components: {
    AddManually,
    CSVMatcher,
    CSVPrompt
  },
  data () {
    return {
      assumeData: null,
      results: [],
      answer: ''
    }
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
    },
    data () {
      const res = []
      this.results.forEach((result, i) => {
        for (let x = 0; x < result.length; x++) {
          if (!res[x]) { res[x] = [] }
          res[x] = [...res[x], result[x]]
        }
      })
      return res
    }
  },
  methods: {
    setAnswer (answer) {
      this.answer = answer
    },
    getData (file) {
      if (!file) {
        return
      }
      const vm = this
      Papa.parse(file, {
        complete (results) {
          if (vm.answer === 'yes') { results.data.shift() }
          vm.results = results.data
        }
      })
      this.$store.commit('dashboardTop/setModal', { modalType: 'csvMatch', to: true })
    }

  }
}
</script>

<style>

</style>
