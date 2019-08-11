import {Api} from './API'
import {Request, requestMethods} from './Request'
//user的Api实现层
const User = '/account'

let _ = require("lodash")

export class UserApi extends Api {
  //用户登录
  async login(userName, password) {
    let url = User + '/login'
    let params = {
      username: userName,
      password: password
    }
    return await this.send(new Request(requestMethods.POST, url, params))
  }

  async forget(username, phone, email, newPassword) {
    let url = User + '/forget'
    let params = {
      username: username,
      newPassword: newPassword,
      phone: phone,
      email: email
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  async loginAgain(session) {
    let url = User + '/loginAgain'
    let header = {
      cookie: "session=" + session
    }
    console.log('loginAgain')
    return await this.send(new Request(requestMethods.POST, url, undefined,header))
  }

  //用户注册
  async register(userName, password, email, phone, invite) {
    let url = User + '/register'
    let params = {
      username: userName,
      password: password,
      email: email,
      phone: phone
    }
    if (!_.isUndefined(invite)) {
      params.invite = invite
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  //用户退出
  async logout() {
    let url = User + '/logout'
    return await this.send(new Request(requestMethods.GET, url))

  }

  //用户重置密码
  async  resetPassword(oldPassword, newPassword) {
    let url = User + '/reset'
    let params = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  async getCost() {
    let url = "/pay/cost"
    return await this.send(new Request(requestMethods.GET, url))

  }

  async  pay(id) {
    let url = "/pay/"
    let params = {
      id: id
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  async queryPay(orderId) {
    let url = "/pay/query"
    let params = {
      order_id: orderId
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  async inviteList() {
    let url = User + "/invitees"
    return await this.send(new Request(requestMethods.POST, url))


  }
}
