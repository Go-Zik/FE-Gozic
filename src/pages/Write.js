import React, { useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import styled from 'styled-components'
import { addRecruit } from '../api/detailapi'

function Write() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [companytype, setCompanyType] = useState('')
  const [startdate, setStartDate] = useState('')
  const [enddate, setEnddate] = useState('')
  const [recruittentperiod, setRecruittentperiod] = useState(false)

  // 이미지 upload useState
  const [img, setImg] = useState(null)
  const [logo, setLogo] = useState(null)

  // 이미지 미리보기 upload useState
  const [viewLogo, setViewLogo] = useState('')
  const [viewImg, setViewImg] = useState('')

  const logoFileInputRef = useRef()

  const [incruittype, setIncruittype] = useState('')
  const [jobdetail, setJobdetail] = useState('')

  const [incruittype2, setIncruittype2] = useState('')
  const [jobdetail2, setJobdetail2] = useState('')

  // logo onChange 핸들러
  const logoImgInputHandler = (e) => {
    setLogo(e.target.files[0])
    const file = logoFileInputRef.current.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setViewLogo(reader.result)
    }
  }

  const queryClient = useQueryClient()
  const addMutation = useMutation(addRecruit, {
    onSuccess: () => {
      queryClient.invalidateQueries('recruits')
    },
  })

  const addButton = () => {
    const formData = new FormData()

    for (let i of [
      title,
      description,
      companytype,
      startdate,
      enddate,
      recruittentperiod,
    ]) {
      formData.append(
        `${i}`,
        new Blob([JSON.stringify(i)], {
          type: 'application/json',
        })
      )
    }

    formData.append('logo', logo)
    formData.append('img', img)
    // formData.append('title', title);
    // formData.append('description', description)
    // formData.append('companytype', companytype)
    // formData.append('startdate', startdate)
    // formData.append('enddate', enddate)
    // formData.append('recruittentperiod', recruittentperiod)

    // const incruit = {

    // }
    // formData.append('incruittype', incruittype)
    // formData.append('jobdetail', jobdetail)
    // console.log(formData.get(img))

    // addMutation.mutate(formData)
  }

  return (
    <StDivWrap>
      <StDivContainer>
        <StDivLogoimg>
          <StLabelLogo htmlFor="logo">회사 로고 이미지 업로드</StLabelLogo>
          <StImgLogo src={viewLogo ? viewLogo : null} />
          <StInputLogo
            name="logo"
            id="logo"
            type="file"
            ref={logoFileInputRef}
            onChange={logoImgInputHandler}
          />
        </StDivLogoimg>
        <StDivInfo>
          <div>
            <StInputTitle
              type="text"
              placeholder="기업 명을 작성해주세요"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div>
            <p>
              채용기간 시작 날짜
              <input
                type="date"
                id="startDate"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </p>

            <p>
              채용기간 마감 날짜
              <input
                type="date"
                id="endDate"
                onChange={(e) => setEnddate(e.target.value)}
              />
            </p>
          </div>
          <div>
            <div onClick={() => setRecruittentperiod(!recruittentperiod)}>
              상시 모집 버튼
            </div>

            <select onChange={(e) => setCompanyType(e.target.value)}>
              <option>기업의 형태를 지정해주세요</option>
              <option value="대기업">대기업</option>
              <option value="중견기업">중견기업</option>
              <option value="공공기관">공공기관</option>
              <option value="기타기업">기타기업</option>
            </select>
          </div>
        </StDivInfo>
      </StDivContainer>
      <div>
        <select onChange={(e) => setIncruittype(e.target.value)}>
          <option>채용 형태를 지정해주세요</option>
          <option>신입</option>
          <option>경력</option>
          <option>인턴</option>
          <option>계약직</option>
        </select>
        <input
          type="text"
          name="jobdetail"
          placeholder="담당할 업무를 작성해주세요"
          value={jobdetail}
          onChange={(e) => setJobdetail(e.target.value)}
        />
      </div>
      <div>
        <select onChange={(e) => setIncruittype2(e.target.value)}>
          <option>채용 형태를 지정해주세요</option>
          <option>신입</option>
          <option>경력</option>
          <option>인턴</option>
          <option>계약직</option>
        </select>
        <input
          type="text"
          name="jobdetail"
          placeholder="담당할 업무를 작성해주세요"
          value={jobdetail2}
          onChange={(e) => setJobdetail2(e.target.value)}
        />
      </div>
      <div>
        <input
          hidden
          name="img"
          id="img"
          type="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <textarea
          type="text"
          name="description"
          placeholder="내용을 작성해주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button onClick={addButton}>작성</button>
      <button>취소</button>
    </StDivWrap>
  )
}

export default Write

const StDivWrap = styled.div`
  width: 750px;
  padding: 35px 0px;
  padding-bottom: 20px;
  margin: 20px auto;
  position: relative;
  display: block;
  font-family: 'NotoSans';
  font-weight: 900;
`
const StDivContainer = styled.div`
  position: relative;
  float: right;
  background: #fff;
  width: 680px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 25px;
  border: solid 1px #ddd;
  font-size: 16px;
`
const StDivLogoimg = styled.div`
  width: 90px;
  height: 140px;
  margin-right: 30px;
  float: left;
`
const StLabelLogo = styled.label`
  width: 103px;
  height: 35px;
  margin-right: 30px;
  float: left;
  border: none;
  font-size: 12px;
  text-align: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.1);
  top: 170px;
`
const StDivInfo = styled.div`
  position: relative;
  float: left;
`
const StInputLogo = styled.input`
  display: none;
`
const StImgLogo = styled.img`
  width: 102px;
  height: 142px;
  position: absolute;
  left: 25px;
`
const StInputTitle = styled.input`
  width: 250px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  :focus {
    outline: 1px solid rgba(0, 0, 0, 0.3);
  }
`