import {Api} from './API'
import {Request, requestMethods} from './Request'
//user的Api实现层
const Link = '/feature'

export class LinkApi extends Api {

  //转换链接
  transfer(links, send = true) {
    let url = Link + '/toshorturl'
    let params = {
      data: links,
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.transfer, params)
    return super.judgeSend(send)
  }

  //修改短链
  editLink(id, longLink, note, send = true) {
    let url = Link + '/urls/change'
    let params = {
      id: id,
      longurl: longLink,
      note: note
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.editLink, params)
    return super.judgeSend(send)
  }

  //获取链接列表数据
  getLinkList(page, num = 8, send = true) {
    let url = Link + '/urls'
    let params = {
      page: page,
      num: num
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.getLinkList, params)
    return super.judgeSend(send)
  }

  //删除链接
  deleteLink(linkId, send = true) {
    console.log("删除", linkId)
    let url = Link + '/urls/delete'
    let params = {
      id: linkId
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.deleteLink, params)
    return super.judgeSend(send)
  }

}
