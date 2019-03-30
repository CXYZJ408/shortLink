export class Request {
  get header () {
    return this._header
  }

  set header (value) {
    this._header = value
  }

  constructor (requestMethod, url, func, params = undefined, header = undefined) {
    this._requestMethod = requestMethod
    this._url = url
    this._params = params
    this._name = getFuncName(func)
    this._header = header
  }

  set requestMethod (value) {
    this._requestMethod = value
  }

  set url (value) {
    this._url = value
  }

  set params (value) {
    this._params = value
  }

  set name (value) {
    this._name = value
  }

  get requestMethod () {
    return this._requestMethod
  }

  get url () {
    return this._url
  }

  get params () {
    return this._params
  }

  get name () {
    return this._name
  }
}

function getFuncName (func) {
  let funString = func.toString()
  funString = funString.substr('function '.length)
  return funString.substr(0, funString.indexOf('('))
}

export const requestMethods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch'
}

