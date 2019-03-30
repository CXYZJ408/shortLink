import UserApi from './User'
import LinkApi from './LinkApi'

let Mock = require('mockjs')
//用户API
Mock.mock('/account/login', 'post', UserApi.login)
Mock.mock('/account/loginAgain', 'post', UserApi.loginAgain)
Mock.mock('/account/register', 'post', UserApi.register)
Mock.mock('/account/logout', 'get', UserApi.logout)
Mock.mock('/account/reset', 'post', UserApi.reset)
Mock.mock('/account/expire', 'get', UserApi.expire)

//短链接API
Mock.mock('/feature/toshortlink', 'post', LinkApi.toShortLink)
Mock.mock('/feature/links', 'get', LinkApi.getLinkList)
Mock.mock('/feature/links/change', 'post', LinkApi.editLinks)
Mock.mock('/feature/links/delete', 'post', LinkApi.deleteLink)
