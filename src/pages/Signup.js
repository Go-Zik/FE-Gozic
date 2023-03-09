import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Signup() {
  const [regist, setRegist] = useState({
    email: '',
    password: '',
    role: '',
    nickName: '',
  })
  const [passwordCheck, setPasswordCheck] = useState('')
  const navigate = useNavigate()

  const SignupHandler = async () => {
    try {
      const body = {
        email: regist.email,
        password: regist.password,
        role: regist.role,
        nickName: regist.nickName,
      }
      console.log(body)

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/join`,
        body,
        { withCredentials: true }
      )
      console.log(response)
      alert('회원가입 성공!')
      navigate('/')
    } catch (error) {
      console.log(error)
      alert('회원가입 실패!')
    }
  }

  const changeHandler = (e) => {
    const { name, value } = e.target
    setRegist((prev) => ({ ...prev, [name]: value }))
  }
  const typeChangeHandler = (e) => {
    const { name, value } = e.target
    setRegist((prev) => ({ ...prev, [name]: value }))
  }

  console.log('regist', regist)

  return (
    <Div>
      <h1>회원가입</h1>
      <Item>
        <ItemBox>
          이메일
          <br />
          <Inputform
            type="text"
            name="email"
            placeholder="abc@example.com"
            value={regist.email}
            onChange={changeHandler}
          />
        </ItemBox>

        <ItemBox>
          비밀번호
          <br />
          <Inputform
            type="password"
            name="password"
            placeholder="8자 이상 입력"
            value={regist.password}
            onChange={changeHandler}
          />
        </ItemBox>

        <ItemBox>
          비밀번호 확인
          <br />
          <Inputform
            type="password"
            name="passwordCheck"
            placeholder="비밀번호 재입력"
            value={passwordCheck}
            onChange={useCallback((e) => setPasswordCheck(e.target.value), [])}
          />
        </ItemBox>

        <ItemBox>
          기업회원이라면 체크
          <br />
          <form>
            <input
              type="radio"
              id="COMPANY"
              name='role'
              value='COMPANY'
              onChange={typeChangeHandler}
            />
            <label htmlFor="COMPANY">COMPANY</label>
            <input
              type="radio"
              id="MEMBER"
              name='role'
              value='MEMBER'
              onChange={typeChangeHandler}
            />
            <label htmlFor="MEMBER">MEMBER</label>
          </form>
        </ItemBox>

        <ItemBox>
          회사 닉네임
          <br />
          <Inputform
            type="text"
            name="nickName"
            placeholder="회사 닉네임을 적어주세요"
            value={regist.nickName}
            onChange={changeHandler}
          />
        </ItemBox>
        <div>
          <Button onClick={SignupHandler}>회원가입</Button>
          <Button onClick={() => navigate('/')}>취소</Button>
        </div>
      </Item>
    </Div>
  )
}

export default Signup

const Div = styled.div`
  height: 50px;
  padding: 5px;
  text-align: center;
  margin: 50px;
`

const Inputform = styled.input`
  height: 20px;
  padding: 10px;
  width: 350px;
  margin: 10px;
  text-align: center;
  border: none;
  border-bottom: 1px solid black;
`

const Button = styled.button`
  color: black;
  padding: 10px;
  border: 1px solid #fed2ba;
  border-radius: 10px;
  background-color: #fff6f0;
  color: #ff6813;
`

const Item = styled.div`
  width: 500px;
  padding: 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const ItemBox = styled.div`
width: 400px;
  margin: auto;
  margin-top: 30px;
  border: 1px solid #fed2ba;
`
