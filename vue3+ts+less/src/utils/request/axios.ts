import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
export const baseURL = import.meta.env.VITE_APP_BASE_API

const service: AxiosInstance = axios.create({
  baseURL
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200) return response

    throw new Error(response.status.toString())
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求参数错误'
          break
        case 401:
          err.message = '未授权，请登录'
          break
        case 403:
          err.message = '跨域拒绝访问'
          break
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    return Promise.reject(err)
  }
)

export default service
