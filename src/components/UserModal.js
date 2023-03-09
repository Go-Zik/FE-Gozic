import React, { useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useCloseModal from '../hooks/useCloseModal'


function UserModal ({...props}) {
  const UserModalRef = useRef()

  const [isOpen, setIsOpen] = useCloseModal(UserModalRef, false) //커스텀훅

  // 모달 끄기 (X버튼 onClick 이벤트 핸들러)
  const closeModal = () => {
    props.setUserModalOpen(false)
  }

  return (
    <Modal onClick={() => setIsOpen(() => props.closeUserModal(false))}>
        <CloseModalDiv
            onClick={() => setIsOpen(() => props.closeUserModal(false))}
        ></CloseModalDiv>
        <DropdownMenu ref={UserModalRef}>
        <li>
            <LiLink cursor="default" onClick={() => setIsOpen(() => props.closeUserModal(false))}>
                {props.email}
            </LiLink>
        </li>
        <LiDdivider></LiDdivider>
        <li>
            <LiLink to="/" onClick={() => setIsOpen(() => props.closeUserModal(false))}>내 계정</LiLink>
        </li>
        <li>
            <LiLink to="/" onClick={() => setIsOpen(() => props.closeUserModal(false))}>이력/관심기업 관리</LiLink>
        </li>
        <li>
            <LiLink to="/" onClick={() => props.logoutHandler()}>
            로그아웃
            </LiLink>
        </li>
        <LiDdivider></LiDdivider>
        <li>
            <LiLink to="/">이용약관</LiLink>
        </li>
        <li>
            <LiLink to="/" weight="600">
            개인정보처리방침
            </LiLink>
        </li>
        <LiDdivider></LiDdivider>
        <li>
            <LiLink to="/">FAQ</LiLink>
        </li>
        <li>
            <LiLink to="/">문의하기</LiLink>
        </li>
        <li>
            <LiLink to="/">제휴 제안</LiLink>
        </li>
        </DropdownMenu>
    </Modal>
  )
}

export default UserModal

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
  opacity: 0;
  padding: 40px 0px;
  cursor: default;
`

const DropdownMenu = styled.ul`
  right: 100px !important;
  left: auto !important;
  top: 45px !important;
  position: absolute;
  top: 100%;
  z-index: 1000;
  display: block;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ccc;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  box-shadow: & > .li {
    display: list-item;
  }
`
const LiLink = styled(Link)`
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: ${(props) => (props.weight ? props.weight : '300')};
  line-height: 1.428571429;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
  cursor: ${(props) => (props.cursor ? props.cursor : 'pointer')};
  &:hover {
    background: #f0f0f0;
  }
`

const LiDdivider = styled.li`
  display: list-item;
  height: 1px;
  margin: 9px 0;
  overflow: hidden;
  background-color: #e5e5e5;
`
