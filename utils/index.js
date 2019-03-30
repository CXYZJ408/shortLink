// 解析请求头cookie的指定name值
let _ = require('lodash')
import CryptoJS from 'crypto-js'

let key = '7410258963qwsedr';  //密钥必须为16或32位
let iv = '0123456789abcdef';

function getAesString(data, key, iv) {//加密
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let encrypted = CryptoJS.AES.encrypt(data, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();    //返回的是base64格式的密文
}

function getDAesString(encrypted, key, iv) {//解密
  key = CryptoJS.enc.Utf8.parse(key);
  iv = CryptoJS.enc.Utf8.parse(iv);
  let decrypted = CryptoJS.AES.decrypt(encrypted, key,
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  console.log("decrypted", decrypted)
  return CryptoJS.enc.Utf8.stringify(decrypted);      //
}

export function encrypt(data) { //加密
  return getAesString(data, key, iv);   //密文
}

export function decode(data) {//解密
  return getDAesString(data, key, iv);//明文
}

export const parseCookieByName = (cookie, name) => {
  if (!cookie || !name) return ''
  let pattern = new RegExp(`(?:^|\\s)${name}=([^;]*)(?:;|$)`)
  let matched = cookie.match(pattern) || []
  let value = matched[1] || ''
  return decodeURIComponent(value)
}

export function dataURLtoFile(dataUrl, filename) {//base64转file
  let arr = dataUrl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime})
}

export function param2Obj(data) {

  return JSON.parse(
    '{"' +
    decodeURIComponent(data)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

export function transformTime(time) {
  if (_.isString(time)) {
    time = parseInt(time)
  }
  let date = new Date(time)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  return Y + M + D
}

export function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

export function guid() {
  /**
   * @return {string}
   */
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }

  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
}

export function words(text) {
  //用word方式计算正文字数
  let str = text
  str = str.replace(/(\r\n+|\s+|　+)/g, '龘')
  str = str.replace(/[\x00-\xff]/g, 'm')
  str = str.replace(/m+/g, '*')
  str = str.replace(/龘+/g, '')
  //返回字数
  return str.length
}

export function scrollToSmooth(size, callback) {
  let currentTop = document.documentElement.scrollTop || document.body.scrollTop
  let decrement
  let interval
  interval = setInterval(() => {
    console.log(Math.abs(currentTop - size))
    if (Math.abs(currentTop - size) > 1) {
      if (Math.abs(currentTop - size) < 20) {
        decrement = 1
      } else if (Math.abs(currentTop - size) < 100 && Math.abs(currentTop - size) >= 20) {
        decrement = 7
      } else if (Math.abs(currentTop - size) >= 100 && Math.abs(currentTop - size) < 500) {
        decrement = 15
      } else {
        decrement = 30
      }
      if (currentTop > size) {
        currentTop -= decrement
      } else {
        currentTop += decrement
      }
      scrollTo(0, currentTop)
    } else {
      clearInterval(interval)
      scrollTo(0, size)//强制
      console.log('clear', interval)
      if (_.isFunction(callback)) {
        callback()
      }
    }
  }, 1)
}
