import {param2Obj} from "../utils";

export default {
  toShortLink: () => {
    let test = Math.floor(Math.random() * 100)
    if (test % 2 === 0) {//随机返回正确或错误结果
      return {
        code: 0,
        data: [
          {
            id: "123",
            longurl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file",
            shorturl: "www.aaa.com",
            note: "微软"
          },
          {
            id: "456",
            longurl: "http://element-cn.eleme.io/#/zh-CN/component/upload",
            shorturl: "www.bbb.com",
            note: "谷歌"
          }, {
            id: "789",
            longurl: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file",
            shorturl: "www.ccc.com",
            note: "知乎"
          }, {
            id: "987",
            longurl: "http://element-cn.eleme.io/#/zh-CN/component/upload",
            shorturl: "www.ddd.com",
            note: "阿里"
          },
        ]

      }
    }
    return {
      code: 1,
      msg: "未知错误！"
    }
  },
  getLinkList: (options) => {
    const {page} = param2Obj(options.body)
    return {
      code: 0,
      data: {
        page: {
          total: 10,
          page: parseInt(page)
        },
        links: [
          {
            id: "1",
            longurl: "https://www.microsoft.com/zh-cn",
            shorturl: "www.abc.com",
            note: `微软${page}`
          },
          {
            id: "2",
            longurl: "https://www.google.com/",
            shorturl: "www.dfs.com",
            note: `谷歌${page}`
          },
          {
            id: "3",
            longurl: "https://www.microsoft.com/zh-cn",
            shorturl: "www.abc.com",
            note: `微软${page}`
          },
          {
            id: "4",
            longurl: "https://www.google.com/",
            shorturl: "www.dfs.com",
            note: `谷歌${page}`
          },
          {
            id: "5",
            longurl: "https://www.microsoft.com/zh-cn",
            shorturl: "www.abc.com",
            note: `微软${page}`
          },
          {
            id: "6",
            longurl: "https://www.google.com/",
            shorturl: "www.dfs.com",
            note: `谷歌${page}`
          },
          {
            id: "7",
            longurl: "https://www.microsoft.com/zh-cn",
            shorturl: "www.abc.com",
            note: `微软${page}`
          },
          {
            id: "8",
            longurl: "https://www.google.com/",
            shorturl: "www.dfs.com",
            note: `谷歌${page}`
          }
        ]
      }
    }
  },
  editLinks: (options) => {
    const {id, longurl, note} = param2Obj(options.body)
    return {
      code: 0,
      data: {
        id: id,
        longurl: longurl,
        note: note,
        shorturl: "www.abc.com"
      }
    }
  },
  deleteLink: (options) => {
    const id = param2Obj(options.body)
    return {
      code: 0
    }
  },
  getRealTime: (options) => {
    return {
      "code": 0,
      "data": [
        {
          "click": 30667,
          "time": 1555146120
        },
        {
          "click": 74002,
          "time": 1555146180
        },
        {
          "click": 73751,
          "time": 1555146240
        },
        {
          "click": 73745,
          "time": 1555146300
        },
        {
          "click": 73542,
          "time": 1555146360
        },
        {
          "click": 73407,
          "time": 1555146420
        },
        {
          "click": 73520,
          "time": 1555146480
        },
        {
          "click": 73355,
          "time": 1555146540
        },
        {
          "click": 73569,
          "time": 1555146600
        },
        {
          "click": 73674,
          "time": 1555146660
        },
        {
          "click": 73403,
          "time": 1555146720
        },
        {
          "click": 73275,
          "time": 1555146780
        },
        {
          "click": 73293,
          "time": 1555146840
        },
        {
          "click": 57207,
          "time": 1555146900
        }
      ],
      "msg": "success"
    }
  },
  getList: () => {
    return {
      code: 0,
      data: [
        {
          "id": 1,
          "shortLink": "www.abc.com",
          "longLink": "https://vuetifyjs.com/en/components/chips",
          "note": "知乎",
          "time": 1555164451
        },
        {
          "id": 2,
          "shortLink": "www.abc.com",
          "longLink": "https://vuetifyjs.com/en/components/chips",
          "note": "知乎",
          "time": 1555164521
        },
        {
          "id": 3,
          "shortLink": "www.abc.com",
          "longLink": "https://vuetifyjs.com/en/components/chips",
          "note": "知乎",
          "time": 1555164530
        },
        {
          "id": 4,
          "shortLink": "www.abc.com",
          "longLink": "https://vuetifyjs.com/en/components/chips",
          "note": "知乎",
          "time": 1555164533
        },
        {
          "id": 5,
          "shortLink": "www.abc.com",
          "longLink": "https://vuetifyjs.com/en/components/chips",
          "note": "知乎",
          "time": 1555164533
        }
      ]
    }
  }
}
