const state = () => ({
  names: [],
  emails: [],
  all: [],
  message: ''
})

const actions = {
  addClient ({ commit, state }, client) {
    commit('setMessage', '')
    const exists = state.all.find(c => c.email === client.email)
    if (exists) {
      commit('setMessage', { text: 'That email is already included.', type: 'error' })
      return
    }
    const newClientList = [...state.all, client]
    commit('setClients', newClientList)
  },
  removeClient ({ commit, state }, client) {
    const newClientList = state.all.filter(c => c !== client)
    commit('setClients', newClientList)
  },
  updateClient ({ commit, state }, client) {
    let tempClient = state.all.find(c => c === client)
    const index = state.all.indexOf(tempClient)
    tempClient = client.item
    const newClientList = state.all[index] = tempClient
    commit('setClients', newClientList)
  }
}

const mutations = {
  setClients (state, clients) {
    state.all = clients
  },
  setMessage (state, message) {
    state.message = message
  },
  fieldAction (state, { action, item, name }) {
    if (action === 'edit') {
      state[item] = [...state[item], name]
    } else {
      state[item] = state[item].filter(c => c !== name)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
