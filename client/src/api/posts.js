import axios from 'axios'

export default {
  getPosts () {
    return axios.get('http://localhost:8000/posts/')
  },
  getPost (id) {
    return axios.get(`http://localhost:8000/posts/${id}`)
  }
}
