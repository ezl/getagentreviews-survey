const state = () => ({
  user: null,
  email: null,
  loading: false,
  serverErrors: [],
  tempEmail: '',
  reviews: []
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
  },
  async getReviews ({ commit }, id) {
    commit('setLoading', true)
    await this.$axios
      .get('/users/reviews/' + id)
      .then(({ data }) => {
        commit('setReviews', data)
      })
      .catch((err) => {
        console.log(err.response)
        alert('errors! check console for now!')
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
  },
  setReviews (state, reviews) {
    state.reviews = reviews
  }
}

export default {
  state,
  mutations,
  actions
}
