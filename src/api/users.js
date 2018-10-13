import axios from 'axios'

export default {
  getUsers () {
    return axios.get('http://localhost:8000/users/')
  },
  getUser (id) {
    return axios.get(`http://localhost:8000/users/${id}`)
  }
}
