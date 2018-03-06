import format from 'string-template'

export default {
  _config: null,
  _resource: {},

  init (config) {
    this._config = config
    return this
  },

  loadResource (lang) {
    const { _config } = this
    return _config.load(lang)
      .then(res => {
        this.setResource(_config.ns, res)
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
    console.log(this._resource, ns, res)
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

  translate (key, ...args) {
    const { keys, namespace } = this.extractFromKey(key)

    if (!this._resource[namespace]) {
      return console.warn(`[I18N]: ${namespace} does not exist!`)
    }

    const formatKey = keys.reduce((res, key) => {
      if (res && typeof res === 'object' && res.hasOwnProperty(key)) {
        return res[key]
      }
      return key
    }, this._resource[namespace])

    return format(formatKey, ...args)
  }
}
