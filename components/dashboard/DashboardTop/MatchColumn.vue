<template>
  <v-col cols="5">
    <v-card height="500">
      <v-card-title>
        <v-select label="Column" :items="['Email', 'Phone Number', 'First Name', 'Last Name', 'Full Name']" />
        <v-list-item v-for="item in data" :key="item">
          <v-list-item-content>
            <v-list-item-title>
              {{ item }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
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
  computed: {
    matchesEmail () {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const isEmail = re.test(String(this.data[1]).toLowerCase())
      return isEmail
    }
  }
}
</script>

<style scoped>
.v-card {
    overflow: auto;
}
</style>
