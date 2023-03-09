import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  deleteIncruitapi,
  favoriteIncruit,
  getRecruit,
  incruitDeadline,
  recentRecruit,
} from '../api/detailapi'
import RecentRecruitComponents from '../components/RecentRecruitComponents'

function DetailRecruit() {
  const param = useParams()
  const navigate = useNavigate()
  const [favorite, setFavorite] = useState(false)

  const { isLoading, isError, data } = useQuery('recruit', () =>
    getRecruit(param.id)
  )

  const queryClient = useQueryClient()
  const deleteMutation = useMutation(deleteIncruitapi, {
    onSuccess: () => {
      queryClient.invalidateQueries('incruit')
    },
    onError: (error) => {
      alert('본인 채용 공고만 삭제가 가능합니다')
    },
  })

  const resultAll = useQuery('recruitAll', recentRecruit)

  const deleteButton = (id) => {
    if (window.confirm('공고를 삭제하시겠습니까?') === true) {
      deleteMutation.mutate(id)
      navigate('/detail')
    } else {
      return
    }
  }

  if (isLoading) return <h1>로딩중</h1>
  if (isError) return <h1>error</h1>
  if (resultAll.isLoading === true) return <h1>로딩중</h1>
  if (resultAll.isError) return <h1>error</h1>

  const resultData = resultAll.data.data

  const nowDay = new Date()
  const lastDate = new Date(data.lastdate)
  const diff = Math.floor(
    (lastDate.getTime() - nowDay.getTime()) / (1000 * 60 * 60 * 24)
  )
  const absDiff = Math.abs(diff)
  console.log(absDiff)

  const clickFavorite = () => {
    favoriteIncruit(param.id)
    setFavorite(!favorite)
  }

  const updateHandler = () => {
    navigate(`/update/${param.id}`)
  }

  console.log(data)

  return (
    <>
      <StDivWrap>
        <StDivContainer>
          <StDivLogo>
            <StImgLogo src={`${data.logo}`} />
          </StDivLogo>
          <div>
            <StDivTitle>
              <StPTitle>
                {data.title}
                {data.hasfav === favorite ? (
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
              <StBtnDeadLine onClick={() => incruitDeadline(param.id)}>
                수시 채용공고 마감
              </StBtnDeadLine>
            </StDivTitle>
            <div>
              <StPDate>
                {data.lastdate === null ? (
                  <> {data.startdate} ~ </>
                ) : (
                  <>
                    {data.startdate} ~ {data.lastdate}
                    {diff > 0 ? (
                      <StSpanDDay>({diff}일 남음)</StSpanDDay>
                    ) : diff < 0 ? (
                      <StSpanDDay>({absDiff}일 지남)</StSpanDDay>
                    ) : (
                      <StSpanDDay>당일 마감</StSpanDDay>
                    )}
                  </>
                )}
              </StPDate>
            </div>
            <StDivLink>
              <StBtnLink>
                <StALink href="https://www.jobkorea.co.kr/?utm_source=google&utm_medium=cpc&utm_campaign=PC_%EB%B8%8C%EB%9E%9C%EB%93%9C&utm_content=PC_%EB%B8%8C%EB%9E%9C%EB%93%9C&utm_term=%EC%9E%A1%EC%BD%94%EB%A6%AC%EC%95%84&cmpid=sa_google&gclid=Cj0KCQiApKagBhC1ARIsAFc7Mc7tUQMxo79Cw8cYWZMjiBC7fjTsx7nRIHaUv-BllgkY2J0o93kd2x8aAhnAEALw_wcB">
                  채용 사이트
                </StALink>
              </StBtnLink>
              <StBtnLink>
                <StALink href="https://www.saramin.co.kr/zf_user/">
                  채용 공고 공유
                </StALink>
              </StBtnLink>
              <StBtnLink>
                <StALink href="https://jasoseol.com/">기업 공체 전략</StALink>
              </StBtnLink>
            </StDivLink>
            <StDivCount>
              <StSpanCount>공고 조회 {data.viewcount}회 | </StSpanCount>
              <StSpanCount>즐겨찾기 {data.favorite}회 | </StSpanCount>
              <StSpanCount>홈페이지 방문 2회</StSpanCount>
            </StDivCount>
          </div>
        </StDivContainer>
        <div>
          {data.job.map((job, index) => {
            return (
              <div key={index}>
                <StDivRecruitContent key={index}>
                  <div style={{ width: '122px' }}>
                    <StSpanRecruitTpye>{job.incruittype}</StSpanRecruitTpye>
                  </div>
                  <div style={{ width: '300px' }}>
                    <StSpanJobDetail>{job.jobdetail}</StSpanJobDetail>
                  </div>
                  <div style={{ width: '135px', marginLeft: 'auto' }}>
                    <StBtnJob>자기소개서 쓰기</StBtnJob>
                  </div>
                </StDivRecruitContent>
              </div>
            )
          })}
          <RecentRecruitComponents resultData={resultData} />
        </div>
        <StDivImg>
          <StImageImage src={`${data.image}`} />
        </StDivImg>
        <StDivIncruitContent>{data.description}</StDivIncruitContent>
        <StDivAPI>
          <StDivAPIbutton onClick={updateHandler}> + 수정</StDivAPIbutton>
          <StDivAPIbutton onClick={() => deleteButton(param.id)}>
            + 삭제
          </StDivAPIbutton>
        </StDivAPI>
      </StDivWrap>
    </>
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
const StALink = styled.a`
  color: #777777;
  text-decoration: none;
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
