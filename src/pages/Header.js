import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import '../index.css'
import { getUser, removeUser } from '../util/localstorage'

const Header = ({ children, user }) => {
  const userInfo = getUser()
  const navigate = useNavigate()

  const logoutHandler = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      removeUser()
      window.location.reload()
      alert('로그아웃완료')
      navigate('/')
    }
    return
  }

  return (
    <HeaderContainer>
      <IndexHeader>
        <IndexLeft>
          <Link to="/">
            <LogoBox>
              <img
                alt="logo"
                src="https://d2bovrvbszerbl.cloudfront.net/assets/logo/logo_landscape-01bd6c93380effd6467ebc566cd6b4b8afd436b716be616dbde484ab28828423.svg"
              />
            </LogoBox>
          </Link>
          <TabDivider />
          <TabCenter>
            <TabButton>
              <MyLink to="/recruit">
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
            <Name> 테스트 유저 {userInfo.sub}</Name>
            <Button onClick={logoutHandler}>Logout</Button>
          </IndexRight>
        ) : (
          <IndexRight>
            <LoginButton onClick={() => navigate('/login')}>회원가입/로그인</LoginButton>
            <EnterpriseButton>기업서비스</EnterpriseButton>
          </IndexRight>
        )}
      </IndexHeader>
      {children || <Outlet />}
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: auto;
  z-index: 101;
`

const IndexHeader = styled.div`
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
const LoginButton = styled.div`
width: 105px;
    height: 32px;
    margin-right: 8px;
    cursor: pointer;
    white-space: nowrap;
    background: #FFF6F0;
    border-color: #FED2BA;
    color: #FF6813;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    border: 1px solid #FED2BA;
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
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    background: #FFFFFF;
    font-weight: 400;
`
const Button = styled.button`
  color: black;
  font-family: 'InkLipquid';
  font-weight: bold;
  font-size: 19px;
`
const Name = styled.b`
  font-weight: bold;
`
