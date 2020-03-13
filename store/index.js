const state = () => ({
  loading: false
})

const mutations = {
  setLoading (state, bool) {
    state.loading = bool
  }
}

const actions = {
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    await dispatch('auth/getUser', this.$cookiz.get('auth-token'))
  }
}

export default {
  state,
  mutations,
  actions
}
