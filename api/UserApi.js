import {Api} from './API'
import {Request, requestMethods} from './Request'
//user的Api实现层
const User = '/account'


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
  loginAgain(cookie, send = true) {
    let url = User + '/loginAgain'
    let params = {
      cookie: cookie,
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.loginAgain, params)
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
    if (invite.length !== 0) {
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
      password1: oldPassword,
      password2: newPassword
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.resetPassword, params)
    return super.judgeSend(send)
  }
}
