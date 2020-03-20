const state = () => ({
  user: null,
  email: null,
  loading: false,
  serverErrors: [],
  tempEmail: ''
})

const actions = {
  async getUser ({ commit }, token) {
    await this.$axios
      .get('/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => {
        commit('setUser', data)
      })
      .catch((err) => {
        console.error(err)
        commit('setUser', null)
      })
  },
  logout ({ commit }, token) {
    commit('setLoading', true)
    console.log(token)
    this.$axios
      .post(
        '/users/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(({ data }) => {
        this.$router.push('/login')
        commit('setUser', null)
        commit('setLoading', false)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  register ({ commit }, payload) {
    commit('setLoading', true)
    this.$axios
      .post('/users', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(({ data }) => {
        // console.log(data)
        alert(`You've been registed ${data.name}, redirecting you to login!`)
        this.$router.push('/login')
        commit('setLoading', false)
        commit('setTempEmail', data.email)
      })
      .catch((err) => {
        console.log(err.response)
        commit('setLoading', false)
        alert('errors! check console for now!')
        state.serverErrors = err.response.data
      })
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setUserImage (state, image) {
    state.user.profile.image = image
  },
  setLoading (state, bool) {
    state.loading = bool
  },
  setTempEmail (state, email) {
    state.tempEmail = email
  }
}

export default {
  state,
  mutations,
  actions
}
