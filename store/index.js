let _ = require('lodash')
import {parseCookieByName} from '../utils'
import {UserApi} from '../api/UserApi'

export const state = () => ({
  user: {},//user信息
  isLogin: false,
  title: ""
})

export const mutations = {
  login(state, data) {
    state.user = data.user
    state.isLogin = true
  },

  logout(state) {
    state.isLogin = false
    state.user = {}
  },
  setTitle(state, title) {
    state.title = title
  },
  paySuccess(state, payMsg) {
    state.user.isVip = payMsg.isVip
    state.user.expireTime = payMsg.expireTime
  }
}
export const actions = {
  async nuxtServerInit(store, {req}) {//在跳转其它的页面或是刷新页面的时候，nuxt会自动调用
    //因为vue项目再刷新页面的时候不会保存用户的状态信息，所以每次在刷新的时候自动读取cookie中的数据进行登录
    //模拟再次登录
    let cookie = parseCookieByName(req.headers.cookie, 'user')//获取token
    if (!_.isEmpty(cookie)) {//存在cookie
      //调用登录API
      let $userApi = new UserApi()
      await $userApi.loginAgain(cookie).then(res => {
        if (res.code === 0) {
          console.log("loginAgain")
          store.commit('login', res.data)
        }
      })
    }

  }
}
