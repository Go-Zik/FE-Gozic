import axios from 'axios'
import { getCookie } from '../util/cookie'

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    authorization: `${getCookie('userToken')}`,
  }
})

// 공고 페이지
export const getRecruitAll = async() => {
  const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/recruit`)
  return data.data
}

// 채용 공고 조회
export const getRecruit = async (id) => {
  const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/recruit/${id}`)
  return data.data
}

// 채용 공고 추가
export const addIncruit = async (formData) => {
  await instance.post(`/api/recruit`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
//채용 공고 수정
export const updateIncruit = async (formData, id) => {
  await instance.put(`/api/recruit/${id}`, formData)
}

// 수시채용 공고 마감
export const incruitDeadline = async (id) => {
  await instance.put(`api/recruit/ededat/${id}`)
}

// 채용 공고 삭제
export const deleteIncruitapi = async (id) => {
  await instance.delete(`/api/recruit/${id}`)
}

// 즐가찾기 추가
export const favoriteIncruit = async (id) => {
  await instance.post(`/api/favorite/${id}`)
}