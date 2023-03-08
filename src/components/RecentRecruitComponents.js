import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function RecentRecruitComponents({ resultData }) {
  const TOTAL_SLIDE = 2
  const slideRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDE) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 36)
    }
  }
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide - 36)
    }
  }
  useEffect(() => {
    slideRef.current.style.transition = 'all 0.8s ease-in-out'
    slideRef.current.style.transform = `translateX(-${currentSlide}%)`
  }, [currentSlide])

  console.log(resultData)

  return (
    <StDivSearchWrap>
      <StPSearch>이런 공고 찾으시나요? 🤖</StPSearch>
      <StDivSearchContain ref={slideRef}>
        {resultData.map((item, index) => {
          return (
            <StDivSearchItem
              key={index}
              onClick={() => navigate(`/detail/recruit/${item.id}`)}
            >
              <img
                style={{ width: '20px', height: '30px' }}
                src={`${item.logo}`}
              />
              <p>{item.nickname}</p>
              <p>{item.viewcount}</p>
            </StDivSearchItem>
          )
        })}
      </StDivSearchContain>
      {currentSlide === 36 ? (
        <StDivprev onClick={prevSlide}>
          <FaAngleLeft />
        </StDivprev>
      ) : (
        <StDivNext onClick={nextSlide}>
          <FaAngleRight />
        </StDivNext>
      )}
    </StDivSearchWrap>
  )
}

export default RecentRecruitComponents

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
  display: inline-flex;
  flex-wrap: nowrap;
`
const StDivSearchItem = styled.div`
  width: 140px;
  height: 108px;
  padding: 8px 12px;
  margin: 0px 8px 8px 10px;
  border: 1px solid red;
  background-color: #ffffff;
  color: #333333;
  border-radius: 4px;
  border: 1px solid #dddddd;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 4%);
  cursor: pointer;
  :hover {
    background-color: #fafafa;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 8%);
  }
`
const StDivprev = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #ffffff;
  text-align: center;
  line-height: 43px;
  position: relative;
  top: -100px;
  right: -10px;
  border: 1px solid #dddddd;
  color: #888888;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 8%);
  cursor: pointer;
  :hover {
    background-color: #fafafa;
  }
`
const StDivNext = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background-color: #ffffff;
  text-align: center;
  line-height: 43px;
  position: relative;
  top: -100px;
  right: -640px;
  border: 1px solid #dddddd;
  color: #888888;
  box-shadow: 0px 2px 4px rgb(0, 0, 0, 8%);
  cursor: pointer;
  :hover {
    background-color: #fafafa;
  }
`
