import Request from './request'
// import eventable from 'decorators/eventable'
const extend = Object.assign

/**
 * restful风格的ajax请求, 提供事件支持EventEmitter2
 * @class REST
 */
// @eventable
class REST extends Request {
  constructor (baseUri = [], cache = false, setAuth = true) {
    super(baseUri, cache, setAuth)

    /**
     * @abstract 由子类覆盖
     * @type {Array}
     */
    this.baseUri = baseUri
  }

  addUri (uri) {
    this.baseUri.push(uri)
    return this
  }

  GET (options) {
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        uri: options
      }
    } else if (!options) {
      options = {}
    }

    if (options.params) {
      Object.keys(options.params).map((key) => {
        if (options.params[key]) {
          options.params[key] = options.params[key].toString().replace(/'/g, '%27')
        }
      })
    }

    // this.emit('GET', options)

    return this.request(extend({
      method: 'GET'
    }, options))
  }

  /**
   * POST
   * @param {object} options        参数
   */
  POST (options) {
    if (!options) {
      options = {}
    }

    // this.emit('POST', options)

    return this.request(extend({
      method: 'POST'
    }, options))
  }

  /**
   * PUT
   * @param {object} options        参数
   * @param {object} data           参数
   */
  PUT (options, data) {
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        uri: options
      }
    } else if (!options) {
      options = {}
    }

    if (data) {
      options.data = data
    }

    // this.emit('PUT', options)

    return this.request(extend({
      method: 'PUT'
    }, options))
  }

  /**
   * PATCH
   * @param {object} options        参数
   * @param {object} data           参数
   */
  PATCH (options, data) {
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        uri: options
      }
    } else if (!options) {
      options = {}
    }

    if (data) {
      options.data = data
    }

    // this.emit('PATCH', options)

    return this.request(extend({
      method: 'PATCH'
    }, options))
  }

  /**
   * DELETE
   * @param {object|string|number} options        参数
   */
  DELETE (options) {
    if (typeof options === 'string' || typeof options === 'number') {
      options = {
        uri: options
      }
    } else if (!options) {
      options = {}
    }

    // this.emit('DELETE', options)

    return this.request(extend({
      method: 'DELETE'
    }, options))
  }
}

/**
 * GETALL
 * ALL
 * LIST
 */
REST.prototype.GETALL = REST.prototype.ALL = REST.prototype.LIST = REST.prototype.GET

export default REST
