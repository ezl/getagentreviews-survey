const state = () => ({
  modal: {
    addingPeople: false,
    manualAdd: false
  },
  potentialClients: []
})

const actions = {
  addClient ({ commit, state }, client) {
    const exists = state.potentialClients.find(c => c.email === client.email)
    if (exists) {
      return
    }
    commit('setPotentialClients', [...state.potentialClients, client])
  }
}

const mutations = {
  setModal (state, { modalType, to }) {
    state.modal[modalType] = to
  },
  setPotentialClients (state, clients) {
    state.potentialClients = clients
  }
}

export default {
  state,
  actions,
  mutations
}
