import qs from 'qs'
import axios from 'axios'

let _ = require('lodash')
const DEV_MODE = 'dev'
const PRO_MODE = 'pro'

let nowMode = DEV_MODE
if (nowMode === DEV_MODE) {
  axios.defaults.baseURL = "https://t.jumplinker.com/api"
  console.log('开发者模式！！！')
} else {
  axios.defaults.baseURL = "/api"
  console.log('处于生产环境中！！！')
}
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

