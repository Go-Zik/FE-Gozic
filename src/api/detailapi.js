import axios from 'axios'
import { getCookie } from '../util/cookie'

// 채용 공고 조회
export const getRecruit = async (id) => {
  const data = await axios.get(`/api/recruit/${id}`)
  return data
}

// 채용 공고 추가
export const addIncruit = async (formData) => {
  await axios.post(`${process.env.REACT_APP_SERVER}/api/recruit`, formData, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${getCookie('userToken')}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

// 채용 공고 삭제
export const deleteIncruitapi = async (id) => {
  await axios.delete(`/api/recruit/${id}`)
}
