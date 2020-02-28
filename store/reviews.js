const state = () => ({
  chosen: 0,
  rated: false,
  leftFeedBackLocal: false,
  feedback: '',
  leftFeedBackExternal: [],
  externalFeedBack: '',
  agent: null,
  reviewRequest: null
})

const actions = {
  getAgent ({ commit }, id) {
    this.$axios
      .get(`/users/${id}`)
      .then(({ data }) => {
        console.log(data)
        commit('setAgent', data)
      })
      .catch((err) => {
        console.error(err)
      })
  },
  getReview ({ commit, dispatch }, id) {
    this.$axios.get(`/reviewrequest/${id}`)
      .then(({ data }) => {
        console.log('review', data)
        commit('setReviewRequest', data)
        if (!data.link_clicked) {
          // if link hasn't been clicked yet set it to clicked on the backend
          dispatch('stepComplete', { link_clicked: new Date() })
        } else if (data.star_rating_completed) {
          if (data.feedback_completed) {
            if (data.external_review_completed) {
              this.$router.push('/reviews/thankyou')
            }
            this.$router.push('/reviews/externalfeedback')
          }
          this.$router.push('/reviews/localfeedback')
        }
      })
      .catch(err => console.log(err))
  },
  stepComplete ({ commit }, payload) {
    this.$axios.put('/reviewrequest/' + payload.id, payload)
      .then(({ data }) => {
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
        alert('something went wrong...')
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
  }
}

export default {
  state,
  mutations,
  actions
}
