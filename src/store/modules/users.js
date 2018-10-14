import usersApi from '../../api/users'

// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllUsers ({ commit }) {
    usersApi.getUsers().then(users => {
      commit('setUsers', users.data)
    }).catch(err => {
      console.log(err)
    })
  },
  getUser ({ commit }, id) {
    return new Promise((resolve, reject) => {
      usersApi.getUser(id).then(user => {
        commit('setUser', user.data)
        resolve(user)
      }, err => {
        reject(err)
      })
    })
  },
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      usersApi.login(data).then(response => {
        console.log(response)
        localStorage.setItem('jwt', response.data.token)
      }, err => {
        reject(err)
      })
    })
  },
  signup ({ commit }, data) {
    return new Promise((resolve, reject) => {
      usersApi.signup(data).then(response => {
        console.log(response)
      }, err => {
        reject(err)
      })
    })
  }
}

// mutations
const mutations = {
  setUsers (state, users) {
    state.all = users
  },
  setUser (state, user) {
    state.all = [
      ...state.all.filter(({ id }) => id !== user.id),
      user
    ]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
