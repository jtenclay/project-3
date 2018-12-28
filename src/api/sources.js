import axios from './axios'

export default {
  checkSource (source) {
    return axios.get(`sources/check/${encodeURIComponent(source)}`)
  },
  getSource (id) {
    return axios.get(`sources/${id}`)
  }
}
