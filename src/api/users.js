import axios from './axios'

export default {
  getUsers () {
    return axios.get('users')
  },
  getUser (id) {
    return axios.get(`users/${id}`)
  },
  login (data) {
    return axios.post('login', data)
  },
  signup (data) {
    return axios.post('signup', data)
  }
}
