const state = () => ({
  chosen: 0,
  rated: false,
  leftFeedBackLocal: false,
  feedback: '',
  leftFeedBackExternal: [],
  externalFeedBack: '',
  agent: null,
  reviewRequest: null,
  sent: false,
  failed: []
})

const actions = {
  async getAgent ({ commit, state }, id) {
    await this.$axios
      .get(`/users/${id}`)
      .then(({ data }) => {
        commit('setAgent', data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  async getReview ({ commit, dispatch }, id) {
    await this.$axios.get(`/reviewrequest/${id}`)
      .then(({ data }) => {
        commit('setReviewRequest', data)
        if (!data.link_clicked) {
          // if link hasn't been clicked yet set it to clicked on the backend
          dispatch('stepComplete', { link_clicked: new Date(), id: data.id })
        }
      })
      .catch(err => console.log(err))
  },
  async stepComplete ({ commit }, payload) {
    await this.$axios.put('/reviewrequest/' + payload.id, payload, {progress: false})
      .then(({ data }) => {
        commit('setReviewRequest', data)
        if (payload.email_sent) {
          commit('setSent', true)
        }
        if (payload.route) {
          this.$router.push(payload.route)
        }
      })
      .catch((err) => {
        console.log(err)
        commit('setFailed', { item: payload.email })
        // alert('something went wrong... It\'s likely the email is incorrect ')
      })
  },
  bulkSend ({ commit, dispatch }, payload) {
    commit('setFailed', { clear: true })
    payload.items.forEach((client) => {
      dispatch('stepComplete', { id: client.review_id, email_sent: new Date() })
    })
  }
}

const mutations = {
  setChosen (state, chosen) {
    state.chosen = chosen
  },
  setRated (state, bool) {
    if (bool) {
      state.rated = bool
    }
    state.rated = !state.rated
  },
  setLeftFeedBackLocal (state, bool) {
    if (bool) {
      state.leftFeedBackLocal = bool
    }
    state.leftFeedBackLocal = !state.leftFeedBackLocal
  },
  setLeftFeedBackExternal (state, ext) {
    if (ext) {
      const exists = state.leftFeedBackExternal.find(each => each === ext)
      if (exists) {
        alert('You\'ve already left a review here.')
        return
      }
      state.leftFeedBackExternal = [...state.leftFeedBackExternal, ext]
    } else {
      state.leftFeedBackExternal = []
    }
  },
  setFeedback (state, feedback) {
    state.feedback = feedback
  },
  setAgent (state, agent) {
    state.agent = agent
  },
  setReviewRequest (state, reviewRequest) {
    state.reviewRequest = reviewRequest
  },
  setSent (state, sent) {
    state.sent = sent
  },
  setFailed (state, { item, clear }) {
    if (clear) {
      state.failed = []
      return
    }
    state.failed = [...state.failed, item]
  }
}

export default {
  state,
  mutations,
  actions
}
