import {Api} from './API'
import {Request, requestMethods} from './Request'
//user的Api实现层

let _ = require("lodash")

export class OtherApi extends Api {

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

  getNotice(send = true) {
    let url = "/announcement/"

    super.pushRequest = new Request(requestMethods.GET, url, this.getNotice)
    return super.judgeSend(send)
  }
}
