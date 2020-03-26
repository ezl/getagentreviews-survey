const state = () => ({
  loading: false
})

const mutations = {
  setLoading (state, bool) {
    state.loading = bool
  }
}

const actions = {
  async nuxtServerInit ({ commit, dispatch, state }, { req }) {
    await dispatch('auth/getUser', this.$cookiz.get('auth-token'))
    await dispatch('auth/getReviews', state.auth.user.id)
  }
}

export default {
  state,
  mutations,
  actions
}
