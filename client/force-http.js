function redirectHttp () {
  window.addEventListener('load', () => {
    if (window.location.protocol === 'https:') { window.location.protocol = 'http' }
  })
}

module.exports = redirectHttp
