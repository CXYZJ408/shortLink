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
      phone:phone,
      email:email
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.forget, params)
    return super.judgeSend(send)

  }

  loginAgain(cookie, send = true) {
    let url = User + '/loginAgain'
    let params = {
      cookie: cookie
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.loginAgain, params)
    return super.judgeSend(send)
  }

  //用户注册
  register(userName, password, email, phone, invite, send = true) {
    console.log("register", userName, password, email, phone, invite)
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
    console.log(params)
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

  inviteNum(send = true) {
    let url = User + "/invite"
    super.pushRequest = new Request(requestMethods.GET, url, this.inviteNum)
    return super.judgeSend(send)
  }
}
