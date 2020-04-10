const state = () => ({
  names: [],
  emails: [],
  all: [],
  message: { text: '', type: '' },
  bulk: {
    success: [],
    failed: [],
    value: false
  }
})

const actions = {
  addClient ({ commit, state, rootState }, client) {
    commit('setMessage', '')
    const exists = state.all.find(c => c.client.email === client.email)
    if (exists) {
      commit('setMessage', {
        text: 'That email is already included.',
        type: 'error'
      })
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
        // console.log('item', data)
        const newClientList = [...state.all, data]
        commit('setClients', { clients: newClientList })
        commit('setMessage', {
          text: `${data.client.name} is now a client.`,
          type: 'success'
        })
      })
      .catch((err) => {
        alert('test!')
        console.log(err)
      })
  },
  bulkAdd ({ commit, state, rootState }, clients) {
    commit('setBulk', { value: true })
    commit('setMessage', '')
    commit(
      'dashboardTop/setModal',
      { modalType: 'csvMatch', to: false },
      { root: true }
    )
    let exists = []
    clients.forEach((client) => {
      const finder = state.all.find(c => c.client.email === client.email)
      if (finder) {
        exists = [...exists, finder]
        clients = clients.filter(c => c !== client)
      }
    })
    if (!clients.length) {
      commit('setBulk', { value: false })
      commit(
        'dashboardTop/setModal',
        { modalType: 'csvMatch', to: true },
        { root: true }
      )
      commit('dashboardTop/setErrors', { text: 'You already have all those clients.', type: 'csvError' }, { root: true })
      return
    }
    if (exists.length) {
      commit(
        'dashboardTop/setErrors',
        { text: 'some emails already exists and won\'t be added.', type: 'csvError' },
        { root: true }
      )
    }
    this.$axios
      .post('/clients/bulk', {
        clients,
        agent: rootState.auth.user.id
      })
      .then(({ data }) => {
        console.log(data.failed)
        commit('setBulk', { value: false })
        commit('setBulk', { success: data.success })
        commit('setBulk', { failed: data.failed })
        let newClientList = state.all
        data.success.forEach((newClient) => {
          newClientList = [...newClientList, newClient]
        })
        commit('setClients', { clients: newClientList })
        commit('dashboardTop/setModal', { modalType: 'csvMatch', to: false }, { root: true })
      })
      .catch((err) => {
        commit('setBulk', { value: false })
        if (err.response) {
          commit('setBulk', { failed: err.response.data.failed })
        }
        commit(
          'dashboardTop/setModal',
          { modalType: 'csvMatch', to: true },
          { root: true }
        )
      })
  },
  async getUserClients ({ commit }, id) {
    await this.$axios
      .get(`/users/${id}/clients`)
      .then(({ data }) => {
        // console.log(data)
        commit('setClients', { clients: data })
      })
      .catch((err) => {
        console.log(err)
      })
  },
  remove ({ commit, state }, { client }) {
    const newClientList = state.all.filter(c => c.client !== client)
    commit('setClients', { clients: newClientList })
    this.$axios
      .delete(`/clients/${client.id}`)
      .then(({ data }) => {})
      .catch((err) => {
        console.log(err)
      })
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
  },
  setBulk (state, { value, success, failed }) {
    if (value || value === false) {
      state.bulk.value = value
    }
    if (success) {
      state.bulk.success = success
    }
    if (failed) {
      state.bulk.failed = failed
    }
  }
}

export default {
  state,
  mutations,
  actions
}
