import posts from '../../api/posts'

// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllPosts ({ commit }) {
    posts.getPosts().then(posts => {
      commit('setPosts', posts.data)
    }).catch(err => {
      console.log(err)
    })
  }
}

// mutations
const mutations = {
  setPosts (state, posts) {
    state.all = posts
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
