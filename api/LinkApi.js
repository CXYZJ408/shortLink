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

  transferFree(link, isRed = false, send = true) {
    let url = 'free/toshorturl'
    let params = {
      longurl: link,
      isRed: isRed
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.transferFree, params)
    return super.judgeSend(send)
  }

  restoreLink(shortUrl, send = true) {
    let url = 'free/restore'
    let params = {
      shorturl: shortUrl,
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.restoreLink, params)
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
    let url = Link + '/urls/delete'
    let params = {
      id: linkId
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.deleteLink, params)
    return super.judgeSend(send)
  }

  getRealTimeData(links, timeStart, send = true) {
    let url = Link + '/urls/display/real_time'
    let params = {
      links: links,
      time_start: timeStart,
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.getRealTimeData, params)
    return super.judgeSend(send)
  }

  getJumpLink(send = true) {
    let url = Link + '/urls/display/'
    super.pushRequest = new Request(requestMethods.POST, url, this.getJumpLink)
    return super.judgeSend(send)
  }

  getUserAllLinks() {
    return this.getLinkList(1, Number.MAX_SAFE_INTEGER)
  }

  getLinkMonthData(links, send = true) {
    let url = Link + '/urls/display/month'
    let params = {
      links: links
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.getLinkMonthData, params)
    return super.judgeSend(send)
  }


  getQRcode(link, send = true) {
    let url = Link + "/urls/qrcode"
    let params = {
      url: link
    }
    super.pushRequest = new Request(requestMethods.POST, url, this.getQRcode, params)
    return super.judgeSend(send)

  }
}
