import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/'
})

// axios.interceptors.request.use(function (request) {
//   var authToken = sessionStorage.jwt
//   if (authToken) {
//     if (request.headers && !request.headers.Authorization) {
//       request.headers['Authorization'] = `Bearer ${authToken}`
//     }
//   }
//   request.headers.post['Content-Type'] = 'application/json'
//   if (request.data) {
//     request.data = humps.decamelizeKeys(request.data)
//   }
//   return request
// })

export default instance
