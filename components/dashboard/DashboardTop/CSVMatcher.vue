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
        Based on your CSV, our results have returned:
        <v-row justify="center">
          <MatchColumn v-for="item in data" :key="item" :data="item" />
        </v-row>
        <ul>
          Names are:
          <li v-for="(names, index) in assumptions.names" :key="index">
            {{ names }}
          </li>
        </ul>
        <ul>
          Numbers are are:
          <li v-for="(numbers, index) in assumptions.numbers" :key="index">
            {{ numbers }}
          </li>
        </ul>
        <ul>
          Emails are:
          <li v-for="(emails, index) in assumptions.emails" :key="index">
            {{ emails }}
          </li>
        </ul>
        If these don't look right, choose what columns match what:
        <ul v-for="(full, index) in data" :key="index">
          <select id="" class="default-input" name="">
            <option value="">
              email
            </option>
            <option value="">
              first name
            </option>
            <option value="">
              last name
            </option>
            <option value="">
              full name
            </option>
            <option value="">
              phone number
            </option>
          </select>
          <li v-for="(item, i) in full" :key="i">
            <template><b>{{ item }}</b></template>
          </li>
        </ul>
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
    assumptions: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => {}
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
  }
}
</script>

<style>

</style>
