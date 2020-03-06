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
    console.log(
      this.$cookiz.get(
        'auth-token'
      )
    )
    await dispatch('auth/getUser', this.$cookiz.get('auth-token'))
  }
  // async getUser () {
  //   console.log('user')
  // }
}

export default {
  state,
  mutations,
  actions
}
