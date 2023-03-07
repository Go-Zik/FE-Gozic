import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { deleteIncruitapi, favoriteIncruit, getRecruit, getRecruitAll } from '../api/detailapi'

function DetailRecruit() {
  const param = useParams()
  const navigate = useNavigate()
  const [favorite, setFavorite] = useState(false)
  const { isLoading, isError, data } = useQuery('recruit', () =>
    getRecruit(param.id)
  )
  // const {isLoadingAll, isErrorAll, dataAll, dataAll2} = useQuery('allrecruit', getRecruitAll)

  if (isLoading) return <h1>로딩중</h1>
  if (isError) return <h1>error</h1>

  const nowDay = new Date()
  const lastDate = new Date(data.lastDate)
  const diff = Math.floor(
    (lastDate.getTime() - nowDay.getTime()) / (1000 * 60 * 60 * 24)
  )

  const deleteIncruit = (id) => {
    if (window.confirm('게시글을 삭제하시겠습니까?' === true)) {
      deleteIncruitapi(id)

      navigate('/')
    } else {
      return
    }
  }
  const clickFavorite = () => {
    favoriteIncruit(param.id)
    setFavorite(!favorite)
  }

  const updateHandler = () => {
    navigate(`/update/${param.id}`)
  }

  if(isLoading) return <h1>로딩중</h1>
  if(isError) return <h1>error</h1>

  console.log(data)

  return (
    <StDivWrap>
      <StDivContainer>
        {' '}
        {/* Container */}
        <StDivLogo>
          <StImgLogo src={`${data.logo}`} />
        </StDivLogo>
        <div>
          <StDivTitle>
            <StPTitle>
              {data.nickname}
              {favorite === false ? (
                <>
                  <StSpanStar onClick={clickFavorite}>
                    <StImgStar src="https://d2bovrvbszerbl.cloudfront.net/assets/main/calendar/star_unselect-0487753c5d876594f017088ec977a7f006c768bfcc975c19c4d9ebe00e322bb1.png" />
                  </StSpanStar>
                </>
              ) : (
                <StSpanStar onClick={clickFavorite}>
                  <StImgStar src="https://d2bovrvbszerbl.cloudfront.net/assets/main/calendar/star_select-c30fc8f4e82378168df71dcc2dc8cba105a91597fa5c771b1600636f3544d976.png" />
                </StSpanStar>
              )}
            </StPTitle>
            <StBtnDeadLine>수시 채용공고 마감</StBtnDeadLine>
          </StDivTitle>
          <div>
            <StPDate>
              {data.startDate} ~ {data.lastDate}
              {diff > 0 ? (
                <StSpanDDay>({diff}일 남음)</StSpanDDay>
              ) : (
                <StSpanDDay>({diff}일 지남)</StSpanDDay>
              )}
            </StPDate>
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
        {data.job.map((job, index) => {
          return (
            <StDivRecruitContent key={index}>
              <div style={{ width: '122px' }}>
                <StSpanRecruitTpye>{job.incruitType}</StSpanRecruitTpye>
              </div>
              <div style={{ width: '300px' }}>
                <StSpanJobDetail>{job.jobDetail}</StSpanJobDetail>
              </div>
              <div style={{ width: '135px', marginLeft: 'auto' }}>
                <StBtnJob>자기소개서 쓰기</StBtnJob>
              </div>
            </StDivRecruitContent>
          )
        })}

        <StDivSearchWrap>
          <StPSearch>이런 공고 찾으시나요? 🤖</StPSearch>
          {/* display로 하기 */}
          <StDivSearchContain>
            <StDivSearchItem>현대 자동차</StDivSearchItem>
            <StDivSearchItem>기아</StDivSearchItem>
            <StDivSearchItem>에이치케이이노엔</StDivSearchItem>
            <StDivSearchItem>포스코케미칼</StDivSearchItem>
          </StDivSearchContain>
        </StDivSearchWrap>
      </div>
      <StDivImg>
        <StImageImage src={`${data.image}`} />
      </StDivImg>
      <StDivIncruitContent>{data.description}</StDivIncruitContent>
      <StDivAPI>
        <StDivAPIbutton onClick={updateHandler}> + 수정</StDivAPIbutton>
        <StDivAPIbutton onClick={() => deleteIncruit(param.id)}>
          {' '}
          + 삭제
        </StDivAPIbutton>
      </StDivAPI>
    </StDivWrap>
  )
}
export default DetailRecruit

const StDivWrap = styled.div`
  padding: 45px 0px;
  width: 712px;
  margin: 20px auto;
  overflow: hidden;
`
const StDivContainer = styled.div`
  position: relative;
  display: flex;
  background-color: #fff;
  width: 680px;
  height: 170px;
  padding: 20px 25px 20px 0px;
  margin-bottom: 30px;
  border: 1px solid #ddd;
  font-size: 16px;
`
const StDivLogo = styled.div`
  width: 90px;
  height: 140px;
  margin: 0px 25px 0px 20px;
`
const StImgLogo = styled.img`
  width: 90px;
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
const StSpanStar = styled.span`
  margin-left: 10px;
  position: absolute;
  top: -6px;
  font-size: 22px;
  color: #ffea00;
  cursor: pointer;
`
const StDivTitle = styled.div`
  width: 530px;
  display: flex;
`
const StBtnDeadLine = styled.button`
  width: 105px;
  height: 40px;
  margin-left: auto;
  border: 1px solid #eeeeee;
  background-color: white;
  color: #777777;
  cursor: pointer;
  :hover {
    background-color: #fafafa;
  }
`
const StImgStar = styled.img`
  width: 18px;
  height: 17px;
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
const StSpanDDay = styled.span`
  margin-left: 30px;
  color: #ff6813;
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
  :hover {
    background-color: #eeeeee;
  }
  cursor: pointer;
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
  cursor: pointer;
`
// 이런 공고 찾으시나요?
const StDivSearchWrap = styled.div`
  width: 710px;
  height: 198px;
  background-color: #eeeeee;
  padding: 24px 0px 32px 12px;
  margin-top: 20px;
`
const StPSearch = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #555555;
`
const StDivSearchContain = styled.div`
  display: flex;
  flex-wrap: nowrap;
`
const StDivSearchItem = styled.div`
  width: 130px;
  height: 108px;
  padding: 8px 12px;
  margin: 0px 8px 8px 10px;
  border: 1px solid red;
  cursor: pointer;
`
// img
const StDivImg = styled.div`
  width: 710px;
  margin-top: 20px;
`
const StImageImage = styled.img`
  width: 710px;
`
// 채용 공고 내용
const StDivIncruitContent = styled.div`
  width: 710px;
  margin-top: 20px;
`
// 수정 삭제 부분
const StDivAPI = styled.div`
  width: 710px;
  height: 60px;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`
const StDivAPIbutton = styled.div`
  width: 270px;
  height: 36px;
  border: 1px solid #ff6813;
  text-align: center;
  font-size: 14px;
  line-height: 36px;
  color: #ff6813;
  cursor: pointer;
`
