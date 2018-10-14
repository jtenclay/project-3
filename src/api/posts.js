import axios from './axios'

export default {
  getPosts () {
    return axios.get('posts')
  },
  getPost (id) {
    return axios.get(`posts/${id}`)
  },
  newPost (data) {
    return axios.post('posts', data)
  }
}
