import $axios from '../utils/axios'
import {requestMethods} from './Request'

let _ = require('lodash')
const RETURN_TYPE = {//防止被篡改
  //数据的返回格式有两种
  Array: 'Array',//使用数组格式返回api请求数据，为默认返回方式
  Map: 'Map'//使用map方式返回，此方式的key为所调用的API的名字。
  // 注：如果在批量请求中有多个一样的API请求的时候，使用map方式会丢失api请求返回的数据，只会返回最后一次api调用的值
}

export class Api {

  constructor() {
    this._returnType = RETURN_TYPE.Array//数据返回格式为数组形式，为false表示返回字典形式
    this._apply = true
    this._requestQueue = []
    this._RETURN_TYPE = RETURN_TYPE
  }

  get RETURN_TYPE() {
    return this._RETURN_TYPE
  }

  get returnType() {
    return this._returnType
  }

  set returnType(value) {
    if (value === RETURN_TYPE.Map || value === RETURN_TYPE.Array) {
      this._returnType = value
    } else {
      throw 'The value of returnType is not defined'
    }
  }

  get apply() {
    return this._apply
  }

  get requestQueue() {
    return this._requestQueue
  }

  set pushRequest(request) {
    this._requestQueue.push(request)
  }

  set apply(value) {
    this._apply = value
  }

  set requestQueue(value) {
    this._requestQueue = value
  }

  waitSend() {
    this.apply = false
  }

  async send() {
    this.apply = true//将apply重置为true
    let result
    let request = _.cloneDeep(this.requestQueue)
    this.requestQueue = []//清空请求队列
    if (request.length === 1) {
      result = await proxyOne(request, this.returnType)
    } else if (request.length > 1) {
      result = await proxy(request, this.returnType)
    }
    return result
  }

  judgeSend(send) {
    if (this.apply && send) {
      return new Promise(resolve => resolve(this.send()))
    } else {
      return this
    }
  }
}

async function proxy(request, returnType) {//批量请求发送
  let invokes = pack(request)//将请求打包
  return Promise.all(invokes).then(async function (results) {//将所有的请求并行执行，然后返回结果
    if (!_.isEmpty(results)) {
      //成功请求到了数据
      console.log('开始返回数据')
      return pushData(results, request, returnType)
    } else {
      //请求数据失败
      return Promise.reject()
    }

  }).catch((e) => {
    return {statusCode: 404, message: 'Post not found'}
  })
}

async function proxyOne(request, returnType) {//单个请求
  return await proxy(request, returnType).then(result => {
    if (returnType === RETURN_TYPE.Array) {//提取数据
      return result[0]
    } else {
      return result
    }
  })
}

function pushData(results, request, returnType) {//打包数据
  let responseData//提取数据
  if (returnType === RETURN_TYPE.Array) {
    responseData = []//返回数组形式
    for (let i = 0; i < results.length; i++) {
      responseData[i] = results[i].data
    }
  } else {
    responseData = {}//返回map形式
    for (let i = 0; i < results.length; i++) {
      responseData[request[i].name] = results[i].data
    }
  }
  return responseData
}

function pack(request) {//打包
  console.log('请求打包', request)
  let invokes = []
  for (let i = 0; i < request.length; i++) {//封装函数与参数
    invokes.push(new Promise((resolve) => {
      let call = Methods(request[i].requestMethod)
      if (!_.isUndefined(request[i].header)) {
        //存在header
        console.log('存在header', request[i].header)
        if (!_.isUndefined(request[i].params)) {
          //存在params
          console.log('存在params', request[i].params)
          resolve(call(request[i].url, request[i].params, request[i].header))
        } else {
          //不存在params
          console.log('不存在params')
          resolve(call(request[i].url, null, request[i].header))
        }
      } else if (!_.isUndefined(request[i].params)) {
        //不存在header，存在params
        console.log('不存在header，存在params')

        resolve(call(request[i].url, request[i].params))
      } else {
        //header于params均不存在
        console.log('header于params均不存在')
        resolve(call(request[i].url))
      }
    }))
  }
  return invokes
}

function Methods(method) {
  switch (method) {
    case requestMethods.GET:
      return $axios.get
    case requestMethods.PUT:
      return $axios.put
    case requestMethods.DELETE:
      return $axios.delete
    case requestMethods.PATCH:
      return $axios.patch
    case requestMethods.POST:
      return $axios.post
  }
}
