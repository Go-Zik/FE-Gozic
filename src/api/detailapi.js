import axios from 'axios'

// 채용 공고 조회
// export const getRecruit = async () => {
//   const data = await axios.get('/api/recruit')
//   return data
// }

// 채용 공고 추가
export const addRecruit = async (formData) => {
  await axios.post(
    '/api/recruit',
    formData
    //   {
    //     headers: {
    //       Authorization: `Bearer ${getCookie('userToken')}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }
  )
}
