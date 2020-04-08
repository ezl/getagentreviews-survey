<template>
  <v-col v-if="storeData && storeData.data.length" md="6" lg="5" cols="12">
    <div class="text-center ma-2">
      <v-snackbar
        v-model="err"
        top
        :timeout="1500"
      >
        {{ curr }} is already included.
        <v-btn
          color="green"
          text
          @click="err = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </div>
    <v-card height="500">
      <v-card-title>
        <span v-if="invalidList.length" class="body-2"><span class="red--text mr-1">Error:</span>The highlighted items aren't proper format</span>
        <v-select v-model="match" label="Column" :items="['Email', 'Phone Number', 'First Name', 'Last Name', 'Full Name', 'Unassigned']" />
        <v-list-item v-for="(item, i) in storeData.data" :key="i">
          <v-list-item-content :class="invalidList.includes(item) ? 'match-error' : ''">
            <v-list-item-title>
              {{ item }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="remove(item)">
              <v-icon color="red lighten-1">
                fas fa-times
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card-title>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      invalidList: [],
      index: '',
      validateArray: [],
      err: false,
      curr: ''

    }
  },
  computed: {
    matches () {
      return this.$store.state.dashboardTop.matches
    },
    storeData () {
      return this.$store.state.dashboardTop.csvData[this.index]
    },
    match: {
      get () {
        return this.storeData && this.storeData.match
      },
      set (newVal) {
        if (this.match === 'Unassigned' && newVal === 'Unassigned') {
          return
        }
        this.validateArray = []
        this.$store.state.dashboardTop.csvData.forEach((item) => {
          if (item.match !== 'Unassigned' && this.validateArray && !this.validateArray.includes(item.match)) {
            this.validateArray = [...this.validateArray, item.match]
          }
        })
        if (this.validateArray.includes(newVal)) {
          if (newVal !== 'Unassigned') {
            this.curr = newVal
          }
          this.$store.commit('dashboardTop/updateMatchedItem', { index: this.index, match: 'Unassigned' })
          this.err = true
          return
        }

        this.$store.commit('dashboardTop/updateMatchedItem', { index: this.index, match: newVal })
        this.validate()
      }
    }

  },
  watch: {
    match (newval) {
      if (newval === 'Phone Number' || newval === 'Email') {
        this.validate()
      }
    }
  },
  mounted () {
    this.findMatch(this.data[0])
    const find = this.$store.state.dashboardTop.csvData.find(each => each.data === this.data)
    this.index = this.$store.state.dashboardTop.csvData.indexOf(find)
  },
  methods: {
    findMatch (item) {
      let match = null
      const phonere = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      const isPhone = phonere.test(item)
      const emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const isEmail = emailre.test(String(item).toLowerCase())
      const nameRe = /^[a-z0-9]+$/i
      const isName = nameRe.test(item) && item.length
      const fullnamere = /^[a-z]([-']?[a-z]+)*( [a-z]([-']?[a-z]+)*)+$/
      const isFullName = fullnamere.test(item.toLowerCase())
      if (isPhone) {
        if (this.matches.includes('Phone Number')) {
          match = 'Unassigned'
        } else {
          match = 'Phone Number'
        }
      } else if (isEmail) {
        if (this.matches.includes('Email')) {
          match = 'Unassigned'
        } else {
          match = 'Email'
        }
      } else if (isFullName) {
        if (this.matches.includes('Full Name')) {
          match = 'Unassigned'
        } else {
          match = 'Full Name'
        }
      } else if (isName) {
        if (this.matches.includes('First Name')) {
          if (this.matches.includes('Last Name')) {
            match = 'Unassigned'
          } else {
            match = 'Last Name'
          }
        } else {
          match = 'First Name'
        }
      } else {
        match = 'Unassigned'
      }
      // add new matched item to store array to prevent duplicate matching
      this.$store.commit('dashboardTop/setMatches', { match })
      this.$store.commit('dashboardTop/setMatchedItem', {
        match,
        data: this.data
      })
      return match
    },
    validate () {
      let valid = false
      this.invalidList = []
      const emailre = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const phonere = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

      if (this.match === 'Email') {
        this.storeData.data.forEach((element) => {
          if (!emailre.test(element)) {
            this.invalidList = [...this.invalidList, element]
          }
        })
      } else if (this.match === 'Phone Number') {
        this.storeData.data.forEach((element) => {
          if (!phonere.test(element)) {
            this.invalidList = [...this.invalidList, element]
          }
        })
      } else {
        valid = true
      }
      return valid
    },
    remove (item) {
      this.$store.commit('dashboardTop/removeDataItem', item)
      this.validate()
    }
  }
}
</script>

<style scoped>
.v-card {
    overflow: auto;
}
.match-error {
  background-color: #f9d7da;
}
</style>
