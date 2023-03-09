import React, { useRef, useState, useEffect } from 'react'
import useCloseModal from '../hooks/useCloseModal'
import { Link } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import ic_close from '../asset/iconImg/ic_close.svg'
import ic_business from '../asset/iconImg/ic_business.svg'
import logo_apple from '../asset/iconImg/logo_apple.svg'
import logo_kakao from '../asset/iconImg/logo_kakao.svg'
import logo_naver from '../asset/iconImg/logo_naver.svg'
import logo_google from '../asset/iconImg/logo_google.svg'

function LoginModal(props, visible) {
  // 모달 외부 클릭시 끄기 처리
  // Modal 창을 useRef로 취득
  const modalRef = useRef()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()
  const [cookies, setCookies] = useCookies(['accessToken'])
  // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
  const closeModal = () => {
    // props.setModalOpen(false)
  }
  // 모달 페이드인아웃
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (visible) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 150);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!isOpen) {
    return null;
  }

  // 로그인 핸들러
  const loginHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/user/login`,
        user
      )
      const jwtToken = res.headers.authorization
      let token = jwtToken.split(' ')[1]

      setCookies('accessToken', jwtToken) // 쿠키에 토큰 저장
      const decodedUserInfo = jwtDecode(token) // 토큰 decode
      // console.log(decodedUserInfo)
      localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo)) //토큰에 저장되어있는 userInfo 저장
      alert('로그인완료')
      navigate('/')
      return res
    } catch (error) {
      console.log('error: ' + JSON.stringify(localStorage))
      console.log(error)
      alert('로그인 실패')
    }
  }

  const changeHandler = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Modal>
      <CloseModalDiv
        onClick={props.closeModal} 
      ></CloseModalDiv>
      <ModalDiv ref={modalRef} visible={visible}>
        <ModalContainer>
          <ModalContent>
            <ModalBody>
              <ModalTitle>시작하기</ModalTitle>
              <CloseModalButton onClick={props.closeModal}>
                <ImgDiv src={ic_close} />
              </CloseModalButton>
              <SocialSignUpDiv>
                <SocialIcon>
                  <SocialLink to="/kakao" onClick={props.closeModal}>
                    <IconImage src={logo_kakao}></IconImage>
                  </SocialLink>
                  <SocialLink to="/naver" onClick={props.closeModal}>
                    <IconImage src={logo_naver}></IconImage>
                  </SocialLink>
                  <SocialLink to="/gogle" onClick={props.closeModal}>
                    <IconImage src={logo_google}></IconImage>
                  </SocialLink>
                  <SocialLink to="/apple" onClick={props.closeModal}>
                    <IconImage src={logo_apple}></IconImage>
                  </SocialLink>
                </SocialIcon>
                <SignUpEmail>
                  <SignLink to="/Signup" onClick={closeModal}>이메일로 회원가입</SignLink>
                </SignUpEmail>
              </SocialSignUpDiv>
              <LoginDiv>
                <LoginTitle>이메일로 로그인</LoginTitle>
                <LoginForm>
                  <InputFields>
                    <InputField>
                      <InputForm
                        type="text"
                        name="email"
                        placeholder="이메일 주소를 입력해 주세요"
                        value={user.email}
                        onChange={changeHandler}
                      />
                    </InputField>
                    <InputField>
                      <InputForm
                        type="password"
                        name="password"
                        placeholder="비밀번호를 입력해 주세요"
                        value={user.password}
                        onChange={changeHandler}
                      />
                    </InputField>
                  </InputFields>
                  <ButtonDiv>
                    <LoginButton onClick={loginHandler}>로그인</LoginButton>
                  </ButtonDiv>
                </LoginForm>
                <SearchPass>
                  <LinkForm onClick={props.closeModal}>Facebook으로 로그인</LinkForm>
                  <div>·</div>
                  <LinkForm onClick={props.closeModal}>비밀번호가 기억나지 않으세요?</LinkForm>
                </SearchPass>
              </LoginDiv>
            </ModalBody>
            <ModalFooter>
              <BusinessPage>
                <BusinessLink to="/" onClick={props.closeModal}>
                  <IconDiv>
                    <img src={ic_business} alt="businessLogo" />
                  </IconDiv>
                  <span>혹시 기업회원이신가요?</span>
                </BusinessLink>
              </BusinessPage>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      </ModalDiv>
    </Modal>
  )
}
export default LoginModal

const fadeIn = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, -25%);
  }
`;

const fadeOut = keyframes`
  0% {
    transform: translate(0, -25%);
  }
  100% {
    transform: translate(0, 0);
  }
`;

const modalSettings = (visible) => css`
  visibility: ${visible ? 'hidden' : 'visible'};
  animation: ${visible ? fadeIn : fadeOut} 0.3s ease-out;
`;

const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1040;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  font-family: 'Noto Sans KR', sans-serif;
  flex-direction: column;
  text-align: center;
`

const CloseModalDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  padding: 40px 0px;
`

const ModalDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 0px;
`

const ModalContainer = styled.div`
  position: absolute;
  width: 400px;
  margin: 0;
  top: 17.5%;
  left: 38%;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  ${(props) => modalSettings(props.visible)}
`

const ModalContent = styled.div`
  position: relative;
  height: 100%;
  padding: 40px 32px 32px;
`

const ModalBody = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 548px;
`

const ModalTitle = styled.div`
  display: flex;
  align-items: flex-end;
  height: 33px;
  color: #333333;
  font-size: 24px;
  font-weight: bold;
  line-height: 33px;
`

const CloseModalButton = styled.div`
  position: absolute;
  top: -5px;
  right: -8px;
  cursor: pointer;
  cursor: pointer;
`

const ImgDiv = styled.img`
  width: 32px;
  height: 32px;
`

const SocialSignUpDiv = styled.div`
  padding: 16px 0 0;
`
const SocialIcon = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 31px;
`
const SocialLink = styled(Link)``

const IconImage = styled.img`
  vertical-align: middle;
`

const SignUpEmail = styled.div``

const SignLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.04));
  color: #777777;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`

const LoginDiv = styled.div`
  padding: 16px 0 0;
`
const LoginTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  color: #555555;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
`

const LoginForm = styled.div``

const InputFields = styled.div`
  margin: -8px 0;
`
const InputField = styled.div`
  margin: 8px 0;
  display: flex;
  align-items: center;
  position: relative;
`
const InputForm = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  margin: 0;
  padding: 0 16px 0 16px;
  background: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #333333;
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  outline: none;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    border: 1px solid black;
  }
`

const ButtonDiv = styled.div`
  margin-top: 20px;
`

const SearchPass = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
  color: #777777;
  font-size: 12px;
  line-height: 18px;
`

const LinkForm = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background: #fff6f0;
  border: 1px solid #fed2ba;
  border-radius: 4px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.04));
  color: #ff6813;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #FFE8DB;
  }
`

const ModalFooter = styled.div`
  width: 100%;
  min-height: 48px;
  max-height: 60px;
  border-top: 1px solid #eeeeee;
`

const BusinessPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 7px 0 0;
  color: #777777;
  font-size: 14px;
  font-weight: 300;
  line-height: 21px;
  text-decoration-line: underline;
`

const BusinessLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 12px;
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }
`

const IconDiv = styled.div`
  margin-right: 4px;
  height: 21px;
`
