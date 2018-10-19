// import postsApi from '../../api/posts'

// // initial state
// const state = {
//   all: []
// }

// // getters
// const getters = {}

// // actions
// const actions = {
//   getAllPosts ({ commit }) {
//     postsApi.getPosts().then(posts => {
//       commit('setPosts', posts.data)
//     }).catch(err => {
//       console.log(err)
//     })
//   },
//   getPost ({ commit }, id) {
//     return new Promise((resolve, reject) => {
//       postsApi.getPost(id).then(post => {
//         const { author, ...cleanedPost } = post.data
//         commit('setPost', cleanedPost)
//         commit('users/setUser', author, { root: true })
//         resolve(post.data)
//       }, err => {
//         reject(err)
//       })
//     })
//   },
//   newPost ({ commit }) {
//     return new Promise((resolve, reject) => {
//       postsApi.newPost().then(post => {
//         commit('setPost', post.data)
//         resolve(post.data)
//       }, err => {
//         reject(err)
//       })
//     })
//   },
//   updatePost ({ commit }, data) {
//     return new Promise((resolve, reject) => {
//       postsApi.updatePost(data).then(post => {
//         commit('setPost', post.data)
//         resolve(post)
//       }, err => {
//         reject(err)
//       })
//     })
//   }
// }

// // mutations
// const mutations = {
//   setPosts (state, posts) {
//     state.all = [
//       posts
//     ]
//   },
//   setPost (state, post) {
//     state.all = [
//       ...state.all.filter(({ id }) => id !== post.id),
//       {
//         ...state.all.find(({ id }) => id === post.id),
//         ...post
//       }
//     ]
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations
// }
