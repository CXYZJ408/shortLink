import {Api} from './API'
import {Request, requestMethods} from './Request'
//user的Api实现层
const Link = '/feature'

export class LinkApi extends Api {

  //转换链接
  transfer(userName, password, send = true) {
    let url = Link + '/toshortlink'
    let params = {
      userName: userName,
      password: password
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.login, params)
    return super.judgeSend(send)
  }

  //用户注册
  register() {

  }

}
