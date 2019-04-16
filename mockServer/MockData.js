import UserApi from './User'
import LinkApi from './LinkApi'

let Mock = require('mockjs')
//用户API
Mock.mock('/account/login', 'post', UserApi.login)
Mock.mock('/account/loginAgain', 'post', UserApi.loginAgain)
Mock.mock('/account/register', 'post', UserApi.register)
Mock.mock('/account/logout', 'get', UserApi.logout)
Mock.mock('/account/reset', 'post', UserApi.reset)

//短链接API
Mock.mock('/feature/toshortlink', 'post', LinkApi.toShortLink)
Mock.mock('/feature/urls', 'post', LinkApi.getLinkList)
Mock.mock('/feature/urls/change', 'post', LinkApi.editLinks)
Mock.mock('/feature/urls/delete', 'post', LinkApi.deleteLink)

Mock.mock('/feature/urls/display/real_time', 'post', LinkApi.getRealTime)
Mock.mock('/feature/urls/display', 'get', LinkApi.getList)


