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
        // console.error(err)
        if (err) {
          commit('setUser', null)
        }
      })
  },
  login ({ commit }, { email, password }) {
    this.$axios
      .post('/users/login', {
        email,
        password
      })
      .then(({ data }) => {
        commit('setUser', data.user)
        this.$cookiz.set('auth-token', data.token)
        this.$router.push('/dashboard/people')
      })
      .catch((err) => {
        if (err.response.status === 422) {
          console.log(err.response.data)
        }
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
        commit('clients/setClients', { clients: [] }, { root: true })
        commit('reviews/setReviewRequest', null, { root: true })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  register ({ commit, dispatch }, { batch, user }) {
    commit('setServerErrors', [])
    commit('setLoading', true)
    this.$axios
      .post('/users', batch, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(({ data }) => {
        dispatch('login', { email: user.email, password: user.password })
      })
      .catch((err) => {
        console.log(err.response)
        commit('setLoading', false)
        commit('setServerErrors', err.response.data)
      })
  },
  async getReviews ({ commit }, id) {
    commit('setLoading', true)
    await this.$axios
      .get('/users/reviews/' + id)
      .then(({ data }) => {
        commit('setReviews', data.data)
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
  },
  setServerErrors (state, errors) {
    state.serverErrors = errors
  }
}

export default {
  state,
  mutations,
  actions
}
