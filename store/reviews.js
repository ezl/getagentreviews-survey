import { set } from 'd3'

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
  failed: [],
  sending: {
    value: false,
    failed: [],
    success: [],
    bulk: false,
    bulkResolved: false
  }
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
    await this.$axios.put('/reviewrequest/' + payload.id, payload, { progress: payload.bulk })
      .then(({ data }) => {
        commit('setReviewRequest', data)
        if (payload.email_sent && !payload.bulk) {
          commit('setSent', true)
        }
        if (payload.bulk) {
          commit('setSending', { success: payload.email })
        }
        if (payload.route) {
          this.$router.push(payload.route)
        }
      })
      .catch((err) => {
        console.log(err)
        commit('setSending', { failed: payload.email })
        // alert('something went wrong... It\'s likely the email is incorrect ')
      })
  },
  bulkSend ({ commit, dispatch }, payload) {
    commit('setSending', { failed: [], success: [], bulk: true, value: true })
    const cliPromise = payload.items.map(async (client) => {
      const result = await dispatch('stepComplete', { id: client.review_id, email: client.email, email_sent: new Date(), bulk: true })
      return new Promise((resolve, reject) => {
        resolve(result)
      })
    })
    Promise.all(cliPromise)
      .then((res) => {
        commit('setSending', { value: false, bulkResolved: true })
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
  },
  setSending (state, { value, success, failed, bulk, bulkResolved }) {
    if (value || value === false) {
      state.sending.value = value
    }
    if (bulkResolved || bulkResolved === false) {
      state.sending.bulkResolved = bulkResolved
    }
    if (bulk) {
      state.sending.bulk = bulk
    }
    if (success) {
      if (!success.length) {
        state.sending.success = []
      } else {
        state.sending.success = [...state.sending.success, success]
      }
    }
    if (failed) {
      if (!failed.length) {
        state.sending.failed = []
      } else {
        state.sending.failed = [...state.sending.failed, failed]
      }
    }
  }
}

export default {
  state,
  mutations,
  actions
}
