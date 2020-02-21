const state = () => ({
  user: null,
  email: null
})


const actions = {
  getUser({ commit }, id) {
    this.$axios(`http://localhost:805/api/users/${id}`)
      .then(({ data }) => {
        console.log(data)
        commit('setUser', data)
      })
      .catch(err => {
        console.error(err)
      })
  },
  getEmail({ commit }, id) {
    this.$axios(`http://localhost:805/api/emails/${id}`)
      .then(({ data }) => {
        console.log(data)
        commit('setEmail', data)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setEmail(state, email) {
    state.email = email
  }

}

export default {
  state,
  mutations,
  actions
}
