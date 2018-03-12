// import axios from 'axios'
// import json from 'json-bigint'
import wepy from 'wepy'
import i18n from '@/i18n'

// const PROTECTION_PREFIX = /^\)\]\}',?\n/
const encode = encodeURIComponent
const addParam = (url, params) => {
  let arr = Object.keys(params).map(key => encode(key) + '=' + encode(params[key])).join('&')

  if (!arr) {
    return url
  }

  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr
}

/**
 * Ajax Request, based on axios
 *
 * @class Request
 */
export default class Request {
  constructor (baseUri = [], cache = false) {
    /**
     * @abstract
     * @type {Array}
     */
    this.baseUri = baseUri
    this.cache = cache
    // this.setAuth = setAuth
  }

  /**
   * 参数 options 说明
   *
   * {number|string|array} uri    资源 ID, 可以是数组
   * {object} replacement         用于替换 url 中的变量, 如 {uri}
   *
   * {object} params              the URL parameters to be sent with the request
   * {object} data                the data to be sent as the request body
   * @see {@link https://github.com/mzabriskie/axios} for more options
   *
   */
  request (options) {
    options.headers = options.headers || {}

    let { uri, params, replacement, ...other } = options
    let url = this.baseUri

    // uri: id | null | undefined
    if (uri || uri === 0) {
      uri = [].concat(uri).map(item => '' + encode(item))
      url = url.concat(uri)
    }

    // remove empty values
    url = url.filter(val => !!val).join('/')

    if (params) {
      url = addParam(url, params)
    }

    // disable cache
    if (!this.cache) {
      // waf DOESN'T support cors Cache-Control header currently
      // would be REMOVED after waf updated
      url = addParam(url, {
        _: new Date().getTime()
      })
    }

    // 替换 URL 中的变量，如 {xxx}
    if (replacement) {
      Object.keys(replacement).forEach(function (key) {
        url = url.replace(new RegExp('{' + key + '}', 'img'), encode(replacement[key]))
      })
    }

    if (i18n.language) {
      options.headers['Accept-Language'] = i18n.language
    }

    return new Promise((resolved, reject) => {
      wepy.request({
        url: url,
        dataType: 'json',
        // responseType: 'text',
        // 服务端 bigint 处理
        // transformResponse: [function (responseText) {
        //   let data = responseText.replace(PROTECTION_PREFIX, '')
        //   try {
        //     data = json.parse(data)
        //   } catch (e) { /* Ignore */ }
        //   return data
        // }],
        ...other,
        success: res => {
          const {data} = res
          resolved(data)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }
}
