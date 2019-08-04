import {Api} from './API'
import {Request, requestMethods} from './Request'
//user的Api实现层
const User = '/account'

let _ = require("lodash")

export class UserApi extends Api {
  //用户登录
  login(userName, password, send = true) {
    let url = User + '/login'
    let params = {
      username: userName,
      password: password
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.login, params)
    return super.judgeSend(send)
  }

  forget(username, phone, email, newPassword, send = true) {
    let url = User + '/forget'
    let params = {
      username: username,
      newPassword: newPassword,
      phone: phone,
      email: email
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.forget, params)
    return super.judgeSend(send)
  }

  async loginAgain(session, send = true) {
    let url = User + '/loginAgain'
    let header = {
      cookie: "session=" + session
    }
    console.log('loginAgain')
    super.pushRequest = new Request(requestMethods.POST, url, this.loginAgain, undefined, header)
    return super.judgeSend(send)
  }

  //用户注册
  register(userName, password, email, phone, invite, send = true) {
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
    super.pushRequest = new Request(requestMethods.POST, url, this.register, params)
    return super.judgeSend(send)
  }

  //用户退出
  logout(send = true) {
    let url = User + '/logout'
    super.pushRequest = new Request(requestMethods.GET, url, this.logout)
    return super.judgeSend(send)
  }

  //用户重置密码
  resetPassword(oldPassword, newPassword, send = true) {
    let url = User + '/reset'
    let params = {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.resetPassword, params)
    return super.judgeSend(send)
  }

  getCost(send = true) {
    let url = "/pay/cost"
    super.pushRequest = new Request(requestMethods.GET, url, this.getCost)
    return super.judgeSend(send)
  }

  pay(id, send = true) {
    let url = "/pay/"
    let params = {
      id: id
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.pay, params)
    return super.judgeSend(send)
  }

  queryPay(orderId, send = true) {
    let url = "/pay/query"
    let params = {
      order_id: orderId
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.queryPay, params)
    return super.judgeSend(send)
  }

  inviteList(send = true) {
    let url = User + "/invitees"
    super.pushRequest = new Request(requestMethods.POST, url, this.inviteList)
    return super.judgeSend(send)

  }
}
