import MobileDetect from 'mobile-detect'
import Redirect from './force-http'

Redirect()

const md = new MobileDetect(window.navigator.userAgent)

if (md.mobile() !== null || md.phone() !== null) {
  window.location.pathname = '/controller'
} else {
  window.location.pathname = '/view'
}
