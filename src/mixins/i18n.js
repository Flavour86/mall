import wepy from 'wepy'
import i18n from '@/i18n'

export default class testMixin extends wepy.mixin {
  data = {
    mixin: 'This is mixin data.'
  }
  methods = {
    tap () {
      this.mixin = 'mixin data was changed'
    }

  }
  $t (...args) {
    return i18n.translate(...args)
  }

  onShow() {
    // console.log('mixin onShow', this.$parent)
  }

  onLoad() {
    const global = this.$root.$parent
    this.loadSpaceI18N(global.globalData.language)
  }
  loadSpaceI18N (lang) {
    const config = this.i18n
    if (!config) return
    config.locales = {
      'zh': `../pages/${config.ns}/i18n/zh.js`,
      'en': `../pages/${config.ns}/i18n/en.js`
    }
    i18n.init({
      ns: config.ns,
      locales: config.locales,
      load (lang) {
        return new Promise(resolve => {
          resolve(require(config.locales[lang]).default)
        })
      }
    }).loadResource(lang)
  }
}
