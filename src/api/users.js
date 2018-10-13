import axios from './axios'

export default {
  getUsers () {
    return axios.get('http://localhost:8000/users/')
  },
  getUser (id) {
    return axios.get(`http://localhost:8000/users/${id}`)
  },
  login (data) {
    return axios.post(`http://localhost:8000/login`)
  },
  signup (data) {
    return axios.post(`http://localhost:8000/signup`, data)
  }
}
