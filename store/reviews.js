const state = () => ({
  chosen: 0,
  rated: false,
  leftFeedBackLocal: false,
  feedback: '',
  leftFeedBackExternal: false,
  externalFeedBack: ''
})

const mutations = {
  setChosen(state, chosen) {
    state.chosen = chosen
  },
  setRated(state, bool) {
    if (bool) {
      state.rated = bool
    }
    state.rated = !state.rated
  },
  setLeftFeedBackLocal(state, bool) {
    if (bool) {
      state.leftFeedBackLocal = bool
    }
    state.leftFeedBackLocal = !state.leftFeedBackLocal
  },
  setLeftFeedBackExternal(state, bool) {
    if (bool) {
      state.leftFeedBackExternal = bool
    }
    state.leftFeedBackExternal = !state.leftFeedBackExternal
  },
  setFeedback(state, feedback) {
    state.feedback = feedback
  }
}

export default {
  state,
  mutations
}
