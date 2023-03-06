import React from 'react'
import styled from 'styled-components'

const Detail = () => {
  const day = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ]

  return (
    <>
      <StDivWrap>
        <div>2023.03</div>
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
                  <StDivContent>공고 내용</StDivContent>
                  <StDivContent>공고 내용</StDivContent>
                  <StDivContent>공고 내용</StDivContent>
                  <StDivContent>공고 내용</StDivContent>
                  <StDivContent>공고 내용</StDivContent>
                  <StDivContent>공고 내용</StDivContent>
                  <StDivContent>공고 내용</StDivContent>
                  <StDivContent>공고 내용</StDivContent>
                  {/* {
                    data.map((date) => {
                      date.day === item 
                      return (
                        date.nickName
                      )
                    })
                  } */}
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
