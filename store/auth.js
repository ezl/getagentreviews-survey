const state = () => ({
  user: null,
  email: null
})

const actions = {
  getUser ({ commit }, id) {
    this.$axios.get(`/users/${id}`)
      .then(({ data }) => {
        console.log(data)
        commit('setUser', data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  getEmail ({ commit }, id) {
    this.$axios.get(`/emails/${id}`)
      .then(({ data }) => {
        console.log(data)
        commit('setEmail', data)
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setEmail (state, email) {
    state.email = email
  }

}

export default {
  state,
  mutations,
  actions
}
