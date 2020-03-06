const state = () => ({
  loading: false
})

const mutations = {
  setLoading (state, bool) {
    state.loading = bool
  }
}

const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    await alert('this worked')
  }
}

export default {
  state,
  mutations,
  actions
}
