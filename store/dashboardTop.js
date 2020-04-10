const state = () => ({
  modal: {
    addingPeople: false,
    manualAdd: false,
    csvMatch: false,
    csvPrompt: false
  },
  csvData: [],
  matches: [],
  potentialClients: [],
  errors: ''
})

const actions = {
  addClient ({ commit, state }, client) {
    const exists = state.potentialClients.find(c => c.email === client.email)
    if (exists) {
      return
    }
    commit('setPotentialClients', [...state.potentialClients, client])
  },
  csvAdd ({ state, dispatch }) {
    const email = state.csvData.find(each => each.match === 'Email')
    let fullname = state.csvData.find(each => each.match === 'Full Name')
    const fname = state.csvData.find(each => each.match === 'First Name')
    const lname = state.csvData.find(each => each.match === 'Last Name')
    const number = state.csvData.find(each => each.match === 'Phone Number')
    let arr = []

    if (fname && lname && !fullname) {
      const copy = fname.data
      for (let i = 0; i < copy.length; i++) {
        copy[i] = copy[i].concat(' ' + lname.data[i])
      }
      fullname = copy
      for (let i = 0; i < fullname.length; i++) {
        arr = [
          ...arr,
          {
            name: fullname[i],
            email: email.data[i],
            phone_number: number && number.data[i]
          }
        ]
      }
      dispatch('clients/bulkAdd', arr, { root: true })
      return
    }
    for (let i = 0; i < fullname.data.length; i++) {
      arr = [
        ...arr,
        {
          name: fullname.data[i],
          email: email.data[i],
          phone_number: number && number.data[i]
        }
      ]
    }
    dispatch('clients/bulkAdd', arr, { root: true })
  }
}

const mutations = {
  setModal (state, { modalType, to }) {
    state.modal[modalType] = to
  },
  setErrors (state, errors) {
    state.errors = errors
  },
  setPotentialClients (state, clients) {
    state.potentialClients = clients
  },
  setAssumption (state, { field, assumptions }) {
    state.assumptions[field] = [...state.assumptions[field], assumptions]
  },
  setMatches (state, { match, clear }) {
    if (clear) {
      state.matches = []
      return
    }
    state.matches = [...state.matches, match]
  },
  setCsvData (state, data) {
    state.csvData = data
  },
  setMatchedItem (state, payload) {
    state.csvData = [...state.csvData, payload]
  },
  removeDataItem (state, item) {
    const find = state.csvData.find(each => each.data.includes(item))
    const index = state.csvData.indexOf(find)
    state.csvData[index].data = state.csvData[index].data.filter(each => each !== item)
  },
  updateMatchedItem (state, { index, match, text }) {
    if (match) {
      state.csvData[index].match = match
    }
  }
}

export default {
  state,
  actions,
  mutations
}
