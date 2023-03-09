import axios from 'axios'
import { getCookie } from '../util/cookie'
import { getUser } from '../util/localstorage'

const user = getUser()

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    authorization: `${getCookie('accessToken')}`,
  },
})

// 공고 페이지
export const getRecruitAll = async () => {
  const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/recruit`)
  return data.data
}

// 채용 공고 조회
export const getRecruit = async (id) => {
  if (user) {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER}/api/recruit/${id}`,
      {
        headers: {
          authorization: `${getCookie('accessToken')}`,
        },
      }
    )
    return data.data
  } else {
    const data = await axios.get(`${process.env.REACT_APP_SERVER}/api/recruit/${id}`)
    return data.data
  }
}

// 채용 공고 추가
export const addIncruit = async (formData) => {
  await axios.post(`${process.env.REACT_APP_SERVER}/api/recruit`, formData, {
    withCredentials: true,
    headers: {
      authorization: `${getCookie('accessToken')}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}
//채용 공고 수정
export const updateIncruit = async ({ formData, id }) => {
  await instance.put(`/api/recruit/${id}`, formData)
}

// 수시채용 공고 마감
export const incruitDeadline = async (id) => {
  await axios.put(
    `${process.env.REACT_APP_SERVER}/api/recruit/endday/${id}`,
    {},
    {
      headers: {
        authorization: `${getCookie('accessToken')}`,
      },
    }
  )
}

// 채용 공고 삭제
export const deleteIncruitapi = async (id) => {
  await instance.delete(`/api/recruit/${id}`)
}

// 즐가찾기 추가
export const favoriteIncruit = async (id) => {
  await axios.post(
    `${process.env.REACT_APP_SERVER}/api/favorite/${id}`,
    {},
    {
      headers: {
        authorization: `${getCookie('accessToken')}`,
      },
    }
  )
}

// 최근 공고 조회
export const recentRecruit = async () => {
  const data = await axios.get(
    `${process.env.REACT_APP_SERVER}/api/recruit/recent`
  )
  return data
}
