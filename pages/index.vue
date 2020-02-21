<template>
<div>
  <form @submit.prevent="inquire">
  <input v-model="email" type="email" class="default-input" placeholder="enter your email">
  <button class="button button--success">Submit</button>
  </form>
  <div v-if="sent">Check your email to send a response</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      sent: false
    }
  },
methods:{  
  inquire() {
    this.$axios.post('http://localhost:805/api/emails', {
      email: this.email
    })
    .then(({data}) => {
      this.sent = true
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
}
</script>

<style>

</style>