export const encode = encodeURIComponent
export const addParam = (url, params) => {
  let arr = Object.keys(params).filter(key => !!params[key]).map(key => key + '=' + params[key]).join('&')

  if (!arr) {
    return url
  }

  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr
}