import {Api} from './API'
import {Request, requestMethods} from './Request'
//user的Api实现层
const Link = '/feature'

export class LinkApi extends Api {

  //转换链接
  async transfer(links) {
    let url = Link + '/toshorturl'
    let params = {
      data: links,
    }
    return await this.send(new Request(requestMethods.POST, url, params))
  }

  async transferFree(link, isRed = false) {
    let url = 'free/toshorturl'
    let params = {
      longurl: link,
      isRed: isRed
    }
    return await this.send(new Request(requestMethods.POST, url, params))
  }

  async restoreLink(shortUrl) {
    let url = 'free/restore'
    let params = {
      shorturl: shortUrl,
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  //修改短链
  async editLink(id, longLink, note,groupId) {
    let url = Link + '/urls/change'
    let params = {
      id: id,
      longurl: longLink,
      note: note,
      group_id:groupId
    }
    return await this.send(new Request(requestMethods.POST, url, params))
  }

  //获取链接列表数据
  async getLinkList(page, num = 8) {
    let url = Link + '/urls'
    let params = {
      page: page,
      num: num
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  //删除链接
  async deleteLink(linkId) {
    let url = Link + '/urls/delete'
    let params = {
      id: linkId
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  async getRealTimeData(links, timeStart) {
    let url = Link + '/urls/display/real_time'
    let params = {
      links: links,
      time_start: timeStart,
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  async getJumpLink() {
    let url = Link + '/urls/display/'
    return await this.send(new Request(requestMethods.POST, url))

  }

  async getUserAllLinks() {
    return this.getLinkList(1, Number.MAX_SAFE_INTEGER)
  }

  async getLinkMonthData(links) {
    let url = Link + '/urls/display/month'
    let params = {
      links: links
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  async getQRcode(link) {
    let url = Link + "/urls/qrcode"
    let params = {
      url: link
    }
    return await this.send(new Request(requestMethods.POST, url, params))

  }

  async getGroups() {
    console.log('getGroups ')
    let url = Link + "/urls/group/"
    return await this.send(new Request(requestMethods.GET, url))

  }
}
