import {param2Obj} from '../utils'

export default {
  login: (options) => {
    return {
      code: 0,
      data: {
        user: {
          username: "Yaser",
          userId: 1,
          isVip: true,
          expireTime: 1557003905000,
          email: "335767798@qq.com",
          phone: "17602545735"
        }
      }
    }
  },
  loginAgain: (options) => {
    const {cookie} = param2Obj(options.body)
    if (cookie === 'abcdefg') {
      return {
        code: 0,
        data: {
          user: {
            username: "Yaser",
            userId: 1,
            isVip: true,
            expireTime: 1557003905000,
            email: "335767798@qq.com",
            phone: "17602545735"
          }
        }
      }
    } else {
      return {
        code: 1,
        msg: "登录名或密码错误！"
      }
    }
  },
  register: (options) => {
    const {username, email, phone} = param2Obj(options.body)
    return {
      code: 0,
      data: {
        user: {
          username: username,
          userId: 1,
          isVip: true,
          expireTime: 1557003905000,
          email: email,
          phone: phone
        }
      }
    }
  },
  logout: (options) => {
    return {code: 0}
  },
  reset: (options) => {
    return {code: 0}
  },

}
