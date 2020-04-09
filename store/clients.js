const state = () => ({
  names: [],
  emails: [],
  all: [],
  message: { text: '', type: '' }
})

const actions = {
  addClient ({ commit, state, rootState }, client) {
    commit('setMessage', '')
    const exists = state.all.find(c => c.email === client.email)
    if (exists) {
      commit('setMessage', { text: 'That email is already included.', type: 'error' })
      return
    }
    this.$axios
      .post('/clients', {
        name: client.name,
        email: client.email,
        phone_number: client.phone_number,
        agent: rootState.auth.user.id
      })
      .then(({ data }) => {
        console.log(data)
        const newClientList = [...state.all, data]
        commit('setClients', { clients: newClientList })
      })
      .catch(err => {
        console.log(err)
      })
  },
  async getUserClients ({ commit }, id) {
    await this.$axios.get(`/users/${id}/clients`)
      .then(({ data }) => {
        commit('setClients', { clients: data })
      })
      .catch((err) => {
        console.log(err)
      })
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
    console.log('clients')
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
