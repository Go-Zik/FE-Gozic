import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(['userToken'])

  const loginHandler = async () => {
    try {
      const response  = await axios.post(
        `http://13.124.198.174:8080/api/user/login`, 
        user, 
        { withCredentials: true }
      )

      const jwtToken = response.headers.authorization;
      
      console.log(response);
      console.log(response.headers);
      console.log(response.headers.authorization)

      let token = jwtToken.split(' ')[1]

      setCookies('userToken', jwtToken) // 쿠키에 토큰 저장
      const decodedUserInfo = jwtDecode(token, {header: true}) // 토큰 decode
      console.log(decodedUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo)) //토큰에 저장되어있는 userInfo 저장
      alert('로그인완료')
      navigate('/')
      return response 
    } catch (error) {
      console.log("error: " + JSON.stringify(localStorage))
      console.log(error)
      alert('로그인 실패')
    }
  }

  const changeHandler = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Div>
      <h1>이메일로 로그인</h1>
      <Loginform>
        <Inputform
          type="text"
          name="email"
          placeholder="이메일 주소를 입력해 주세요"
          value={user.email}
          onChange={changeHandler}
        />
        <br />
        <Inputform
          type="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          value={user.password}
          onChange={changeHandler}
        />
        <br />
        <Button onClick={loginHandler}>로그인</Button>
        <Button onClick={() => navigate('/signup')}>회원가입 하기</Button>
      </Loginform>
    </Div>
  )
}

export default Login

const Div = styled.div`
  width: 400px;
  height: 350px;
  padding: 5px;
  text-align: center;
  margin: 30px auto;
  border-radius: 10px;
`
const Inputform = styled.input`
  padding: 10px;
  height: 25px;
  width: 300px;
  margin: 10px auto;
  background-color: white;
  border: none;
  border-bottom: 1px solid black;
`
const Loginform = styled.div``
const Button = styled.button`
  background-color: #FFF6F0;
  width: 100px;
  border: 1px solid #FED2BA;
  height: 40px;
  color: #FF6813;
  border-radius: 15px;
`
