import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8001/api/'
})

instance.interceptors.request.use(function (request) {
  var authToken = localStorage.jwt
  if (authToken) {
    if (request.headers && !request.headers.Authorization) {
      request.headers['Authorization'] = `Bearer ${authToken}`
    }
  }
  // request.headers.post['Content-Type'] = 'application/json'
  return request
})

export default instance
