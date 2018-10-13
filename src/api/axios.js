import axios from 'axios'

axios.interceptors.request.use(function (request) {
  // var authToken = sessionStorage.jwt
  // if (authToken) {
  //   if (request.headers && !request.headers.Authorization) {
  //     request.headers['Authorization'] = `Bearer ${authToken}`
  //   }
  // }
  request.headers.post['Content-Type'] = 'application/json'
  // if (request.data) {
  //   request.data = humps.decamelizeKeys(request.data)
  // }
  return request
})

export default axios
