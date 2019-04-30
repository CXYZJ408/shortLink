let _ = require('lodash')
import {parseCookieByName} from '../utils'
import {UserApi} from '../api/UserApi'

export const state = () => ({
  user: {},//user信息
  isLogin: false,//是否登陆
  title: "",//标题栏
  purchaseVip: false,//是否要进行会员购买
  device: "windows",//设备信息
  isMobile: false,//是否是手机端
  needNotice: false//是否需要显示公告
})

export const mutations = {
  changeNotice(state, need) {
    state.needNotice = need
  },
  changeDevice(state, device) {
    state.device = device
    state.isMobile = !(device === 'windows')
  },
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
  },
  setPurchaseVip(state, isPurchase) {
    state.purchaseVip = isPurchase
  }
}

export const actions = {
  async nuxtServerInit(store, {req}) {//在跳转其它的页面或是刷新页面的时候，nuxt会自动调用
    //因为vue项目再刷新页面的时候不会保存用户的状态信息，所以每次在刷新的时候自动读取cookie中的数据进行登录
    //模拟再次登

    let session = parseCookieByName(req.headers.cookie, 'session')//获取token
    // return
    if (!_.isEmpty(session)) {//存在cookie
      //调用登录API
      let $userApi = new UserApi()
      await $userApi.loginAgain(session).then(res => {
        if (res.code === 0) {
          store.commit('login', res.data)
        }
      })
    }
  }
}
