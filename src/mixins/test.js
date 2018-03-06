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

  onShow() {
    // console.log('mixin onShow', this.$parent)
  }

  onLoad() {
    const global = this.$parent || this.$root.$parent
    this.loadSpaceI18N(global.globalData.language)
  }

  loadSpaceI18N (lang) {
    const config = this.i18n
    if (!config) return
    i18n.init({
      ns: config.ns,
      load (lang) {
        return new Promise(resolve => {
          resolve(require(`../pages/${config.ns}/i18n/${lang}.js`).default)
        })
      }
    }).loadResource(lang)
  }
}
