import wepy from 'wepy'
import i18n from '@/i18n'

export default class Interaction extends wepy.mixin {
  showLoading (options = {}) {
    const object = {
      title: i18n.translate('loading', 'common'),
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
}
