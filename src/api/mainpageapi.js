import axios from 'axios'
import { getCookie } from '../util/cookie'

// export const MAINTAKE = 4

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    authorization: `${getCookie('accessToken')}`,
  },
})

// 메인 페이지 조회
export const getMainpage = async () => {
  const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/main/`)
  return data.data
}

// // 메인 페이지 맞춤 공고
// export const getMainpageRecommend = async () => {
//   const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/main/`, {}).then((res) => {
    
//   })
//   return data.data
// }