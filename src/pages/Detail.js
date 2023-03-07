import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { getRecruitAll } from '../api/detailapi'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Detail = () => {
  const day = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ]
  const navigate = useNavigate()
  const { isLoading, isError, data } = useQuery('incruit', getRecruitAll)
  if (isLoading) return <h1>로딩중</h1>
  if (isError) return <h1>에러</h1>
  return (
    <>
      <StDivWrap>
        <StDivMonth>
          <StSpanArrow>
            <FaAngleLeft />
          </StSpanArrow>
          2023.03
          <StSpanArrow>
            <FaAngleRight />
          </StSpanArrow>
        </StDivMonth>
        <StDivWeekendWrap>
          <StDivWeekend>WED</StDivWeekend>
          <StDivWeekend>THR</StDivWeekend>
          <StDivWeekend>FRI</StDivWeekend>
          <StDivWeekend>SAT</StDivWeekend>
          <StDivWeekend>SUN</StDivWeekend>
          <StDivWeekend>MON</StDivWeekend>
          <StDivWeekend>TUE</StDivWeekend>
        </StDivWeekendWrap>
        <StDiv>
          {day.map((item, index) => {
            return (
              <StDivDayWrap key={index}>
                <StDivDay>
                  <StDivNum>{item}</StDivNum>
                  {data.map((date, index) => {
                    const startDate = date.startDate
                    const [y, m, d] = startDate.split('-')

                    return item === d ? (
                      <div key={index}>
                        <StPTitle
                          onClick={() => navigate(`/detail/recruit/${date.id}`)}
                        >
                          <StSpanStart>시</StSpanStart> {date.nickname}
                        </StPTitle>
                      </div>
                    ) : null
                  })}
                  {data.map((date, index) => {
                    if (date.lastDate === null) {
                      return
                    } else {
                      const lastDate = date.lastDate
                      const [y, m, d] = lastDate.split('-')

                      return item === d ? (
                        <div key={index}>
                          <StPTitle
                            onClick={() =>
                              navigate(`/detail/recruit/${date.id}`)
                            }
                          >
                            <StSpanEnd>끝</StSpanEnd>
                            {date.nickname}
                          </StPTitle>
                        </div>
                      ) : null
                    }
                  })}
                </StDivDay>
              </StDivDayWrap>
            )
          })}
        </StDiv>
        <StDivWrite onClick={() => navigate('/write')}>
          <StImgWrite src='https://d2bovrvbszerbl.cloudfront.net/assets/recruit/request_recruit-c3a4aebaf7777803190981cacf943eeaebbb7d2b7d1737893f66811243fa086a.png' />
        </StDivWrite>
      </StDivWrap>
    </>
  )
}

export default Detail

const StDivWrap = styled.div`
  margin-top: 50px;
`
const StDivMonth = styled.div`
  height: 48px;
  text-align: center;
  background-color: #eeeeee;
  line-height: 48px;
  font-size: 21px;
  color: #ff6813;
  font-weight: 600;
`
const StSpanArrow = styled.span`
  color: #bbbbbb;
  font-weight: 100;
  line-height: 10px;
  margin: 20px 10px 0px 10px;
  position: relative;
  top: 4px;
`
const StDivWeekendWrap = styled.div`
  display: flex;
  gap: 2px;
`
const StDivWeekend = styled.div`
  width: calc(100% / 7 - 1px);
  height: 19px;
  color: #ffffff;
  background-color: #bbbbbb;
  text-align: center;
`
const StDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  gap: 1px;
`
const StDivDayWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: calc(100% / 7 - 1px);
  border: 1px solid #EEEEEE;
  box-sizing: border-box;
`
const StDivDay = styled.div`
  min-height: 150px;
  text-align: center;
`
const StDivNum = styled.div`
  min-width: calc(100% / 7 - 1px);
  min-height: 22px;
  background-color: #fafafa;
`
const StDivContent = styled.div`
  text-align: center;
`
const StSpanStart = styled.span`
  border-radius: 2px;
  background-color: #ff6813;
  color: #fff;
`
const StSpanEnd = styled.span`
  border-radius: 2px;
  background-color: #3f4b5e;
  color: #fff;
`
const StPTitle = styled.p`
  text-overflow: ellipsis;
  word-break: normal;
  font-size: 13px;
  cursor: pointer;
`
const StDivWrite = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
`
const StImgWrite = styled.img`
  width: 80px;
  height: 96px;
`