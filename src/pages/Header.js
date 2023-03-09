import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import '../index.css'
import { getUser, removeUser } from '../util/localstorage'
import LoginModal from '../components/LoginModal'
import UserModal from '../components/UserModal'
import ic_account from '../asset/iconImg/ic_account.svg'
import ic_notification from '../asset/iconImg/ic_notification.svg'
import ic_chat from '../asset/iconImg/ic_chat.svg'
import logo_landscape from '../asset/iconImg/logo_landscape.svg'

const Header = ({ children }) => {
  const userInfo = getUser()
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const [userModalOpen, setUserModalOpen] = useState(false)

  // 로그인 모달창 노출
  const showModal = () => {
    setModalOpen(true)
  }
  // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
  const closeModal = () => {
    setModalOpen(false)
  }

  // 유저 모달창 노출
  const showUserModal = () => {
    setUserModalOpen(true)
  }
  // 유저 모달창 끄기
  const closeUserModal = () => {
    setUserModalOpen(false)
  }

  

  const logoutHandler = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      removeUser()
      window.location.reload()
      alert('로그아웃완료')
      navigate('/')
    }
    return
  }

  const mantion = () => {
    alert('미구현입니다 ㅠㅠ')
  }

  return (
    <HeaderContainer>
      <IndexHeader>
        <IndexLeft>
          <LogoBox>
            <Link to="/">
              <Img
                alt="logo"
                src={logo_landscape}
              />
            </Link>
          </LogoBox>
          <TabDivider />
          <TabCenter>
            <TabButton>
              <MyLink to="/detail">
                <span>채용공고</span>
              </MyLink>
            </TabButton>
            <TabButton>
              <MyLink>
                <span>자기소개서</span>
              </MyLink>
            </TabButton>
            <TabButton>
              <MyLink>
                <span>이력경력기술서</span>
              </MyLink>
            </TabButton>
            <TabButton>
              <MyLink>
                <span>데이터랩</span>
              </MyLink>
            </TabButton>
            <TabButton>
              <MyLink>
                <span>합격자소서</span>
              </MyLink>
            </TabButton>
            <TabButton>
              <MyLink>
                <span>실무경험 채우기</span>
              </MyLink>
            </TabButton>
            <TabButton>
              <MyLink>
                <span>주니어 이직</span>
              </MyLink>
            </TabButton>
          </TabCenter>
        </IndexLeft>
        {userInfo ? (
          <IndexRight>
            <TabIcon onClick={showUserModal}>
              <IconImage src={ic_account}></IconImage>
              {userModalOpen && userInfo && logoutHandler && closeUserModal && <UserModal setUserModalOpen={setUserModalOpen} email={userInfo.sub} logoutHandler={logoutHandler} closeUserModal={closeUserModal} />}
            </TabIcon>
            <TabIcon>
              <IconImage src={ic_notification}></IconImage>
            </TabIcon>
            <TabIcon onClick={mantion}>
              <IconImage src={ic_chat}></IconImage>
            </TabIcon>
          </IndexRight>
        ) : (
          <IndexRight>
            <LoginButton onClick={showModal}>회원가입/로그인</LoginButton>
            {modalOpen && closeModal && <LoginModal setModalOpen={setModalOpen} closeModal={closeModal}/>}
            <EnterpriseButton onClick={logoutHandler}>
              기업서비스
            </EnterpriseButton>
          </IndexRight>
        )}
      </IndexHeader>
      {children || <Outlet />}
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  top: 0;
  width: 100%;
  height: auto;
  z-index: 101;
`

const IndexHeader = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 52px;
  padding: 0 28px;
  border-bottom: 1px solid #eee;
  z-index: 101;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  color: #707070;
  box-sizing: border-box;
`

const IndexLeft = styled.div`
  display: flex;
  align-items: center;
`
const LogoBox = styled.div`
  margin-right: 16px;
`
const Img = styled.img`
  vertical-align: middle;
`
const TabDivider = styled.div`
  width: 1px;
  height: 16px;
  border-left: 1px solid #dddddd;
`
const TabCenter = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0 24px;
  font-size: 16px;
  white-space: nowrap;
  color: #999999;
`
const TabButton = styled.div`
  position: relative;
  margin: 0 12px;
  cursor: pointer;
  font-weight: 500;

  &:first-child {
    margin-left: 0px;
  }

  &:last-child {
    margin-right: 0px;
  }
`
const MyLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 38px;
  text-decoration: none;
  color: inherit;
  :hover {
    color: black;
  }
`

const IndexRight = styled.div`
  display: flex;
  align-items: center;
`
const TabIcon = styled.div`
  width: 38px;
  height: 38px;
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }
`
const IconImage = styled.img`
  vertical-align: middle;
  width: 24px;
  height: 24px;
`

const LoginButton = styled.div`
  width: 105px;
  height: 32px;
  margin-right: 8px;
  cursor: pointer;
  white-space: nowrap;
  background: #fff6f0;
  border-color: #fed2ba;
  color: #ff6813;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border: 1px solid #fed2ba;
  border-radius: 4px;
  font-weight: 400;
`
const EnterpriseButton = styled.div`
  padding: 6px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777777;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  background: #ffffff;
  font-weight: 400;
`