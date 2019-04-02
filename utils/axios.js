import qs from 'qs'
import axios from 'axios'

let _ = require('lodash')
//todo 去掉注释则可以取消mock服务器的拦截
axios.defaults.baseURL = 'http://47.103.45.133'//请求地址
axios.defaults.withCredentials = true // 允许携带cookie
axios.defaults.changeOrigin = true
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
  post(url, params, headers = {'Content-Type': 'application/x-www-form-urlencoded'}) {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      params = qs.stringify(params)
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

