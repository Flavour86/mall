import wepy from 'wepy'
import i18n from '@/i18n'

export default class Interaction extends wepy.mixin {
  data = {
    loadingText: '加载中..'
  }
  showLoading (options = {}) {
    const {loadingText} = this
    const object = {
      title: i18n.translate('loading', 'common') || loadingText,
      mask: false,
      ...options
    }
    wepy.showLoading(object)
  }

  hideLoading () {
    wepy.hideLoading()
  }

  showToast (options) {
    const object = {
      icon: 'none',
      duration: 2000,
      mask: false,
      ...options
    }
    wepy.showToast(object)
  }

  hideToast () {
    wepy.hideToast()
  }

  showModal (options) {
    const object = {
      showCancel: false,
      cancelText: i18n.translate('cancel', 'common'),
      confirmText: i18n.translate('confirm', 'common'),
      ...options
    }
    wepy.showModal(object)
  }

  redirectUrl ({id, name} = {}, page) {
    if (!page) return console.error('There is no page to jump')
    const url = `../${page}/index?id=${id}&name=${name}`
    wepy.navigateTo({
      url: url
    })
  }
}
