const state = () => ({
  user: null,
  email: null,
  loading: false
})

const actions = {
  async getUser ({ commit }, token) {
    await this.$axios.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        console.log(data)
        commit('setUser', data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  logout ({ commit }, token) {
    commit('setLoading', true)
    console.log(token)
    this.$axios.post('/users/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(({ data }) => {
        this.$router.push('/login')
        commit('setUser', null)
        commit('setLoading', false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setLoading (state, bool) {
    state.loading = bool
  }
}

export default {
  state,
  mutations,
  actions
}
