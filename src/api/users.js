import axios from './axios'

export default {
  getUsers () {
    return axios.get('users')
  },
  getUser (username) {
    return axios.get(`users/${username}`)
  },
  getProfile (username) {
    return axios.get(`users/${username}?includePosts=true`)
  },
  login (data) {
    return axios.post('login', data)
  },
  signup (data) {
    return axios.post('signup', data)
  }
}
