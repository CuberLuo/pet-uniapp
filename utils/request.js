let baseUrl = 'http://106.52.3.13:8080'
// let baseUrl = 'http://127.0.0.1:8080'
export const request = (options = {}) => {
  return new Promise((resolve, reject) => {
    uni
      .request({
        url: baseUrl + options.url || '', //接收请求的API
        method: options.method || 'GET', //接收请求的方式,如果不传默认为GET
        data: options.data || {} //接收请求的data,不传默认为空
      })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
