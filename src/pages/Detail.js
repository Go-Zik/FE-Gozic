import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getRecruitAll } from '../api/detailapi'

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
  const { isLoading, isError, data } = useQuery('incruit', getRecruitAll)
  if (isLoading) return <h1>로딩중</h1>
  if (isError) return <h1>에러</h1>

  console.log(data)

  return (
    <>
      <StDivWrap>
        <StDivMonth>2023.03</StDivMonth>
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
                  <div>{item}</div>
                  <StDivContent>공고 내용</StDivContent>
                  {data.map((date) => {
                    const startDate = date.startDate
                    const [y, m, d] = startDate.split('-')

                    return item === d ? (
                      <p> {date.nickname} </p> 
                      )
                    : null
                  })}
                </StDivDay>
              </StDivDayWrap>
            )
          })}
        </StDiv>
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
`
const StDivDayWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: calc(100% / 7 - 1px);
  outline-offset: -1px;
`
const StDivDay = styled.div`
  margin: 1px;
  text-align: center;
  box-sizing: border-box;
`
const StDivContent = styled.div`
  text-align: center;
`
