<template>
  <v-col cols="11" xl="3" lg="4" md="6" sm="6">
    <v-card
      class="my-12 ml-3 mr-3"
      max-width="374"
      elevation="24"
    >
      <v-card-text>
        <div class="mb-8">
          <i>"{{ cutOff(quote) }}"</i>
        </div>
        <v-rating
          :value="5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        />
      </v-card-text>

      <v-card-actions class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <img :src="img" alt="person that reviewed">
          <div>
            <b class="d-block">{{ name }}</b>
            <span>{{ job }}, {{ company }}</span>
          </div>
        </div>
        <div>
          <img style="width: 70px;" :src="companyImg" alt="logo">
        </div>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    quote: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    job: {
      type: String,
      default: ''
    },
    company: {
      type: String,
      default: ''
    },
    companyImg: {
      type: String,
      default: ''
    }
  },
  methods: {
    cutOff (quote) {
      const max = 90
      let shorten = quote.substring(0, max)
      if (quote.length > max) {
        shorten = shorten + '...'
      }
      return shorten
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/styles';
.v-card {
  padding-bottom: 10px;
  font-size: 12px;
}
img {
  width: 45px;
  border-radius: 50%;
  height: 45px;
  margin-right: 8px;
}
</style>
