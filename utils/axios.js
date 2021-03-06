import qs from 'qs'
import axios from 'axios'

let _ = require('lodash')
axios.defaults.baseURL = "/api"
// axios.defaults.baseURL = "https://t.jumplinker.com/api"
//请求地址
axios.defaults.withCredentials = true // 允许携带cookie
axios.interceptors.response.use(response => {
  return response
}, error => {

  const {response} = error

  return Promise.reject(error)
})
//axios封装
export default {
  get(url, params = {}, headers = {}) {
    return axios.get(url, {params}, {headers: headers})
  },
  post(url, params, headers = {'Content-Type': 'application/json'}) {
    if (headers['Content-Type'] === 'application/json') {
      params = JSON.stringify(params)
    }
    return axios.post(url, params, {headers: headers})
  },
  put(url, params, headers = {}) {
    return axios.put(url, qs.stringify(params), {headers: headers})
  },
  patch(url, params, headers = {}) {
    return axios.patch(url, qs.stringify(params), {headers: headers})
  },
  delete(url, params, headers = {}) {
    return axios.delete(url, {params}, {headers: headers})
  }
}

