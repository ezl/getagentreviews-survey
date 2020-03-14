const state = () => ({
  names: [],
  emails: [],
  all: [],
  message: { text: '', type: '' }
})

const actions = {
  addClient ({ commit, state }, client) {
    console.log(client)
    commit('setMessage', '')
    const exists = state.all.find(c => c.email === client.email)
    if (exists) {
      commit('setMessage', { text: 'That email is already included.', type: 'error' })
      return
    }
    const newClientList = [...state.all, client]
    commit('setClients', { clients: newClientList })
  },
  remove ({ commit, state }, client) {
    const newClientList = state.all.filter(c => c !== client)
    commit('setClients', { clients: newClientList })
  },
  updateClient ({ commit, state }, client) {
    const index = state.all.indexOf(client.current)
    commit('setClients', {
      action: 'editing',
      client: client.current,
      data: client.data,
      index,
      item: client.item
    })
  }
}

const mutations = {
  setClients (state, { action, item, index, data, clients }) {
    if (action && action === 'editing') {
      if (item === 'email') {
        const exists = state.all.find(c => c.email === data)
        if (exists) {
          alert('That email aleady exists')
          return
        }
      }
      state.all[index][item] = data
      return
    }
    state.all = clients
  },
  setMessage (state, message) {
    state.message = message
  },
  fieldAction (state, { action, item, data }) {
    if (action === 'edit') {
      state[item] = [...state[item], data]
    } else {
      state[item] = state[item].filter(c => c !== data)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
