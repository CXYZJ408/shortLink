let _ = require('lodash')
import {parseCookieByName} from '../utils'
import {UserApi} from '../api/UserApi'

export const state = () => ({
  user: {},//user信息
  isLogin: false
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

}
export const actions = {
  async nuxtServerInit(store, {req}) {//在跳转其它的页面或是刷新页面的时候，nuxt会自动调用
    //因为vue项目再刷新页面的时候不会保存用户的状态信息，所以每次在刷新的时候自动读取cookie中的数据进行登录
    let cookie = parseCookieByName(req.headers.cookie, 'user')//获取token
    if (!_.isEmpty(cookie)) {//存在cookie

      //模拟再次登录
      let data = {
        user: {
          username: "Yaser",
          userId: 1,
          isVip: true,
          expireTime: 1557003905000,
          email: "335767798@qq.com",
          phone: "17602545735"
        }
      }
      store.commit('login', data)

      //调用登录API
      //todo 去掉注释
      /* let $userApi = new UserApi()
       $userApi.loginAgain(cookie).then(res => {
         if (res.code === this.$code.SUCCESS) {
           store.commit('login', res.data)
         }
       })*/
    }

  }
}
