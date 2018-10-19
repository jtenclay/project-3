import Vue from 'vue'
import Vuex from 'vuex'
// import posts from './modules/posts'
// import users from './modules/users'
import currentUser from './modules/currentUser'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // posts,
    // users,
    currentUser
  },
  mutations: {

  },
  actions: {

  }
})
