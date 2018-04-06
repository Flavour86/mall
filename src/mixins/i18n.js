import wepy from 'wepy'
import i18n from '@/i18n'

export default class i18nMixin extends wepy.mixin {
  $t (...args) {
    return i18n.translate(...args)
  }

  events = {
    'language-loaded': () => {
      // console.log(this, '22')
    }
  }

  onShow () {
    this.loadSpaceI18N()
  }

  onLoad() {
    this.loadSpaceI18N()
  }
  loadSpaceI18N () {
    const config = this.i18n || {}
    const global = this.$root.$parent
    if (!config) return
    config.locales = {
      'zh': `../pages/${config.ns || 'common'}/i18n/zh.js`,
      'en': `../pages/${config.ns || 'common'}/i18n/en.js`
    }
    i18n.init({
      ns: config.ns,
      locales: config.locales,
      load (lang) {
        return new Promise(resolve => {
          resolve(require(config.locales[lang]).default)
        })
      }
    }).loadResource(global.globalData.language, res => {
      global.globalData.resource = res
      this.$emit('language-loaded')
    })
  }
}
