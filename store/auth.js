const state = () => ({
  user: null
})


const actions = {
  getUser({commit}, id) {
    this.$axios(`http://localhost:805/api/users/${id}`)
    .then(({data}) => {
      console.log(data)
      commit('setUser', data)
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

}

export default {
  state,
  mutations,
  actions
}
