import usersApi from '../../api/users'

// initial state
const state = {
  firstName: null,
  lastName: null,
  username: null,
  id: null,
  token: localStorage.getItem('jwt')
}

// getters
const getters = {}

// actions
const actions = {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      usersApi.login(data).then(({ data }) => {
        commit('setCurrentUser', { ...data.user, token: data.token })
        localStorage.setItem('jwt', data.token)
        resolve(data)
      }, err => {
        reject(err)
      })
    })
  },
  logout ({ commit }) {
    commit('clearCurrentUser')
    localStorage.setItem('jwt', '')
  },
  signup ({ commit }, data) {
    return new Promise((resolve, reject) => {
      usersApi.signup(data).then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
    })
  },
  rehydrate ({ commit }) {
    return new Promise((resolve, reject) => {
      usersApi.rehydrate().then(({ data }) => {
        commit('setCurrentUser', { ...data.user, token: data.token })
        localStorage.setItem('jwt', data.token)
        resolve(data)
      }, err => {
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  setCurrentUser (state, payload) {
    state.token = payload.token
    state.id = payload.id
    state.firstName = payload.firstName
    state.lastName = payload.lastName
    state.username = payload.username
  },
  clearCurrentUser (state) {
    state.token = null
    state.id = null
    state.firstName = null
    state.lastName = null
    state.username = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
