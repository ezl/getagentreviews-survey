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
          Add People {{ data }}
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
    <CSVMatcher :assumptions="initialAssume" :data="data" />
  </div>
</template>

<script>
import * as d3 from 'd3'
import Papa from 'papaparse'
import CSVMatcher from '~/components/dashboard/DashboardTop/CSVMatcher'
import AddManually from '~/components/dashboard/DashboardTop/AddManually'
export default {
  components: {
    AddManually,
    CSVMatcher
  },
  data () {
    return {
      assumeEmail: null,
      assumePhoneNumber: null,
      names: [],
      numbers: [],
      emails: [],
      assumeName: [],
      initialAssume: { names: [], emails: [], numbers: [] },
      clients: [],
      assumeData: null,
      results: []
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
        result.forEach((item, x) => {
          if (!res[x]) { res[x] = [] }
          res[x] = [...res[x], item]
        })
      })
      return res
    }
  },
  methods: {
    getData (e) {
      this.initialAssume = { names: [], emails: [], numbers: [] }
      const vm = this
      Papa.parse(e.target.files[0], {
        complete (results) {
          vm.results = results.data
          for (let i = 0; i < results.data.length; i++) {
            vm.findData(results.data[i])
          }
        }
      })
      this.$store.commit('dashboardTop/setModal', { modalType: 'csvMatch', to: true })
    },
    addClient (name, email) {
      this.$store.dispatch('clients/addClient', { name, email })
    },
    findData (arr) {
      const vm = this

      for (let i = 0; i < arr.length; i++) {
        // const newarr = []
        // newarr.push(arr[i])
        console.log(`just added ${arr[i]} to the ${i} spot of the data array`)

        const otherFormat = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        const isPhone = otherFormat.test(arr[i])
        if (isPhone) {
          vm.initialAssume.numbers.push(arr[i])
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const isEmail = re.test(String(arr[i]).toLowerCase())
        if (isEmail) {
          vm.initialAssume.emails.push(arr[i])
          console.log(arr[i])
        }
        const nameRe = /^[a-z0-9]+$/i
        const isName = nameRe.test(arr[i]) && arr[i].length
        if (isName) {
          if (vm.assumeName.includes(i)) {
            return
          }
          vm.initialAssume.names.push(arr[i])
        }
        // if an item was added but one of the strings don't fit the regex
        if (!isName) {
          vm.assumeName = vm.assumeName.filter(each => each !== i)
        }
      }
    }

  }
}
</script>

<style>

</style>
