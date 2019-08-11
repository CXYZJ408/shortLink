export class Request {
  get header() {
    return this._header
  }

  set header(value) {
    this._header = value
  }

  constructor(requestMethod, url, params = undefined, header = undefined) {
    this._requestMethod = requestMethod
    this._url = url
    this._params = params
    this._header = header
    console.log(this,"request")
  }

  set requestMethod(value) {
    this._requestMethod = value
  }

  set url(value) {
    this._url = value
  }

  set params(value) {
    this._params = value
  }

  get requestMethod() {
    return this._requestMethod
  }

  get url() {
    return this._url
  }

  get params() {
    return this._params
  }

}

export const requestMethods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch'
}

