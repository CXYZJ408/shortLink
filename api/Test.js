import {Api} from './API'
import {Request, requestMethods} from './Request'
//user的Api实现层
// const Link = '/feature'

export class Test extends Api {

  //转换链接
  test(send = true) {
    let url = ""
    super.pushRequest = new Request(requestMethods.GET, url, this.test)
    return super.judgeSend(send)
  }
}
