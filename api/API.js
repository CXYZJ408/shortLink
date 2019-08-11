import $axios from './axios'
import {requestMethods} from './Request'

let _ = require('lodash')

export class Api {

  async send(request) {
    let call = Api.Methods(request.requestMethod)
    let result
    try {
      if (!_.isUndefined(request.header)) {
        //存在header
        console.log('存在header')
        if (!_.isUndefined(request.params)) {
          //存在params
          console.log('存在params')
          result = await call(request.url, request.params, request.header)
        } else {
          //不存在params
          console.log('不存在params')
          result = await call(request.url, null, request.header)
        }
      } else if (!_.isUndefined(request.params)) {
        //不存在header，存在params
        console.log('不存在header，存在params')
        result = await call(request.url, request.params)
      } else {
        //header于params均不存在
        console.log('header与params均不存在')
        result = await call(request.url)
      }
    } catch (err) {
      return Promise.reject(err)
    }

    return Promise.resolve(result.data)
  }
   static Methods(method) {
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
/*  async send() {
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
  }*/
}

/*async function proxy(request, returnType) {//批量请求发送
  let invokes = pack(request)//将请求打包
  return Promise.all(invokes).then(async function (results) {//将所有的请求并行执行，然后返回结果
    if (!_.isEmpty(results)) {
      //成功请求到了数据
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
  let invokes = []
  for (let i = 0; i < request.length; i++) {//封装函数与参数
    invokes.push(new Promise((resolve) => {
      let call = Methods(request[i].requestMethod)
      if (!_.isUndefined(request[i].header)) {
        //存在header
        if (!_.isUndefined(request[i].params)) {
          //存在params
          resolve(call(request[i].url, request[i].params, request[i].header))
        } else {
          //不存在params
          resolve(call(request[i].url, null, request[i].header))
        }
      } else if (!_.isUndefined(request[i].params)) {
        //不存在header，存在params
        resolve(call(request[i].url, request[i].params))
      } else {
        //header于params均不存在
        resolve(call(request[i].url))
      }
    }))
  }
  return invokes
}*/


