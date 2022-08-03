export default class Http {
  static getUrlParamValue(aParam) {
    var results = new RegExp('[?&]' + aParam + '=([^&#]*)').exec(window.location.href)
    if (results == null) {
      return null
    } else {
      if (!results[1]) return ''
      if (results[1] === '') return ''
      return decodeURI(results[1]) || 0
    }
  }
}
