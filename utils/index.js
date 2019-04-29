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
  if (String(time).length === 10) {
    time *= 1000
  }

  let date = new Date(time)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  return Y + M + D
}

export function transformTime2(time) {
  if (_.isString(time)) {
    time = parseInt(time)
  }
  time = time * 1000
  let date = new Date(time)
  let Y = date.getFullYear() + '/'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + " "

  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  return Y + M + D + h + m
}
