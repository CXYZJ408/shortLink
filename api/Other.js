import {Api} from './API'
import {Request, requestMethods} from './Request'
//user的Api实现层

let _ = require("lodash")

export class OtherApi extends Api {

  async getCost() {
    let url = "/pay/cost"
    return await this.send(new Request(requestMethods.GET, url))
  }

  async pay(id) {
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

  async getNotice() {
    let url = "/announcement/"
    return await this.send(new Request(requestMethods.GET, url))

  }

  async payByActiveCode(activeCode) {
    let url = "/pay/card"
    let params = {
      card: activeCode
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }
}
