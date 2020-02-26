const state = () => ({
  chosen: 0,
  rated: false,
  leftFeedBackLocal: false,
  feedback: '',
  leftFeedBackExternal: false,
  externalFeedBack: '',
  agent: null
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
  setLeftFeedBackExternal (state, bool) {
    if (bool) {
      state.leftFeedBackExternal = bool
    }
    state.leftFeedBackExternal = !state.leftFeedBackExternal
  },
  setFeedback (state, feedback) {
    state.feedback = feedback
  },
  setAgent (state, agent) {
    console.log(agent)
    state.agent = agent
  }
}

export default {
  state,
  mutations,
  actions
}
