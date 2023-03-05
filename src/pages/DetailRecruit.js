import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { deleteIncruitapi, getRecruit } from '../api/detailapi'

function DetailRecruit() {
  const param = useParams()
  const navigate = useNavigate();
  const { isLoading, isError, data } = useQuery('recruit', () => getRecruit(param.id))

  const deleteIncruit = (id) => {
    if(window.confirm('게시글을 삭제하시겠습니까?' === true)) {
      deleteIncruitapi(id)

      navigate('/')
    }
  }

  // if(isLoading) return <h1>로딩중</h1>
  // if(isError) return <h1>error</h1>

  return (
    <StDivWrap>
      <StDivContainer>
        {' '}
        {/* Container */}
        <StDivLogo>LOGO IMG{/* <img /> */}</StDivLogo>
        <div>
          <div>
            <StPTitle>기업 명은 여기 들어갑니다</StPTitle>
          </div>
          <div>
            <StPDate>2023.02.22 ~ 2023.03.01 (X일 지남)</StPDate>
          </div>
          <StDivLink>
            <StBtnLink>채용 사이트</StBtnLink>
            <StBtnLink>채용 공고 공유</StBtnLink>
            <StBtnLink>기업 공체 전략</StBtnLink>
          </StDivLink>
          <StDivCount>
            <StSpanCount>공고 조회 1002회 | </StSpanCount>
            <StSpanCount>즐겨찾기 7회 | </StSpanCount>
            <StSpanCount>홈페이지 방문 2회</StSpanCount>
          </StDivCount>
        </div>
      </StDivContainer>
      {/* JobContent */}
      <div>
        <StDivRecruitContent>
          <div style={{ width: '122px' }}>
            <StSpanRecruitTpye>고용 형태</StSpanRecruitTpye>
          </div>
          <div style={{ width: '300px' }}>
            <StSpanJobDetail>담당할 업무</StSpanJobDetail>
          </div>
          <div style={{ width: '135px', marginLeft: 'auto' }}>
            <StBtnJob>자기소개서 쓰기</StBtnJob>
          </div>
        </StDivRecruitContent>

        <div>
          <p>이런 공고 찾으시나요?</p>
          {/* display로 하기 */}
          <div>현대 자동차</div>
          <div>기아</div>
          <div>에이치케이이노엔</div>
          <div>포스코케미칼</div>
        </div>
      </div>
      <div>
        채용 공고 이미지
        {/* <img /> */}
      </div>
      <div>채용 공고 내용</div>
      <div>
        <button>수정</button>
        <button onClick={() => deleteIncruit(param.id)}>삭제</button>
      </div>
    </StDivWrap>
  )
}
export default DetailRecruit

const StDivWrap = styled.div`
  padding: 45px 0px;
  width: 750px;
  margin: 20px auto;
`
const StDivContainer = styled.div`
  position: relative;
  display: flex;
  background-color: #fff;
  width: 680px;
  height: 160px;
  padding: 20px 25px 20px 0px;
  border: 1px solid #ddd;
  font-size: 16px;
`
const StDivLogo = styled.div`
  width: 90px;
  height: 140px;
  margin: 0px 25px 0px 20px;
  border: 1px solid red;
`
// 기업 이름
const StPTitle = styled.p`
  position: relative;
  top: -15px;
  font-size: 18px;
  font-family: 'NotoSans';
  color: #777777;
  font-weight: bold;
`
// 날짜
const StPDate = styled.p`
  position: absolute;
  top: 45px;
  font-size: 16px;
  color: #777777;
  font-family: 'NotoSans';
  font-weight: 400;
  margin-top: 15px;
`
// 방문 사이트
const StDivLink = styled.div`
  width: 358px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0px 20px 0px;
`
const StBtnLink = styled.button`
  width: 98px;
  height: 40px;
  color: #777777;
  background-color: white;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  font-family: 'NotoSans';
`
// 조회 Count
const StDivCount = styled.div`
  margin-top: 20px;
`
const StSpanCount = styled.span`
  color: #999999;
  font-size: 15px;
  font-weight: 400;
`
// JOB Detail
const StDivRecruitContent = styled.div`
  width: 706px;
  height: 40px;
  margin-top: 30px;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
`
const StSpanRecruitTpye = styled.span`
  color: #707070;
  line-height: 40px;
  margin-left: 30px;
`
const StSpanJobDetail = styled.span`
  color: #707070;
  line-height: 40px;
  margin-left: 30px;
`
const StBtnJob = styled.button`
  width: 135px;
  height: 40px;
  border: 1px solid #ff6813;
  background-color: white;
  color: #ff6813;

  :hover {
    background-color: #ff6813;
    color: white;
  }
`
