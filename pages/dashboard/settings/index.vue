<template>
  <v-container>
    <v-card>
      <v-tabs
        :color="$store.state.constants.purple"
        :slider-color="$store.state.constants.purple"
      >
        <v-tab
          v-for="item in items"
          :key="item"
          style="text-transform: inherit"
        >
          <v-icon x-small class="mr-2" style="font-size: 8px;">
            fas fa-circle
          </v-icon> {{ item }}
        </v-tab>
        <v-tab-item class="ml-1">
          <v-card flat>
            <AccountInfo />
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import AccountInfo from '~/components/dashboard/Settings/AccountInfo'
export default {
  layout: 'dashboard',
  components: {
    AccountInfo
  },
  data () {
    return {
      items: [
        'Account info',
        'Password',
        'Business info',
        'Email Template',
        'Review Preference',
        'Billing',
        'Email notification settings'
      ]
    }
  },
  mounted () {
    console.log(this.$store.state.auth.reviews)
  }

}
</script>

<style>
.v-tabs-items {
    /* margin-left: 3px;y */
}
</style>
