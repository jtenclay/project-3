import axios from './axios'

export default {
  checkSource (source) {
    return axios.get(`sources/${encodeURIComponent(source)}`)
  },
  getPostsByUser (username) {
    return axios.get(`posts?user=${username}`)
  },
  getPost (id) {
    return axios.get(`posts/${id}`)
  },
  newPost () {
    return axios.post('posts')
  },
  updatePost (id, data) {
    return axios.put(`posts/${id}`, data)
  }
}
