const state = () => ({
  loading: false
})

const mutations = {
  setLoading (state, bool) {
    state.loading = bool
  }
}

// const actions = {
//   async nuxtServerInit ({ commit }, { req }) {}
// }

export default {
  state,
  mutations
}
