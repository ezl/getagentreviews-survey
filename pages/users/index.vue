<template>
  <div v-if="users" class="users">
    <div v-for="user in users.data" :key="user.id" class="test">
      <h2>{{ user.name }}</h2>
      <p>{{ user.description }}</p>
      <img :src="user.profile.image" :alt="`${user.name}'s profile image`">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      users: null
    }
  },
  mounted () {
    this.$axios
      .get('/users')
      .then(({ data }) => {
        this.users = data
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
img {
  width: 100px;
}
</style>
