import MobileDetect from 'mobile-detect'
import Redirect from './force-http'

Redirect()

const md = new MobileDetect(window.navigator.userAgent)

window.onload=function(){
     $(function(){
         if(window.location.protocol==="https:")
             window.location.protocol="http";
     });
 }

if (md.mobile() !== null || md.phone() !== null) {
  window.location.pathname = '/controller'
} else {
  window.location.pathname = '/view'
}
