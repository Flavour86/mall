import format from 'string-template'

export default {
  _config: null,
  _cacheConfig: {},
  language: 'zh',
  _resource: {},

  init (config) {
    this._config = config
    this._cacheConfig = {
      ...this._cacheConfig,
      [config.ns]: config
    }
    return this
  },

  loadResource (lang, cb) {
    const { _config } = this
    return _config.load(lang)
      .then(res => {
        this.language = lang
        this.setResource(_config.ns, res)
        cb && cb(this._resource)
        return res
      })
      .catch(() => {
        if (/^\w+-/.test(lang)) {
          lang = lang.split('-')[0]
          return this.loadResource(lang)
        }
        return this.loadResource(_config.defaultLanguage)
      })
  },

  setResource (ns, res) {
    this._resource[ns] = res
  },

  extractFromKey (key) {
    const nsSeparator = ':'
    const keySeparator = '.'
    let namespace, keys

    if (key.indexOf(nsSeparator) > -1) {
      const parts = key.split(nsSeparator)
      namespace = parts[0]
      key = parts[1]
    } else {
      namespace = this._config.ns
    }

    keys = key.split(keySeparator)

    return { keys, namespace }
  },

  changeLanguage (lang) {
    this.language = lang
    return new Promise((resolved) => {
      const keys = Object.keys(this._cacheConfig)
      keys.forEach(key => {
        this._resource[key] = require(this._cacheConfig[key].locales[lang]).default
      })
      resolved()
    })
  },

  translate (key, ...args) {
    const { keys, namespace } = this.extractFromKey(key)
    if (!this._resource[args || namespace]) {
      return
      // return console.warn(`[I18N]: ${namespace} does not exist!`)
    }

    const formatKey = keys.reduce((res, key) => {
      if (res && typeof res === 'object' && res.hasOwnProperty(key)) {
        return res[key]
      }
      return key
    }, this._resource[args || namespace])
    // console.log(this._resource, namespace, formatKey, args)
    return format(formatKey, ...args)
  }
}
