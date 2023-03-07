import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { addIncruit, getRecruit, updateIncruit } from '../api/detailapi'

function Update() {
  const navigate = useNavigate()
  const param = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [companytype, setCompanyType] = useState('')
  const [startdate, setStartDate] = useState('')
  const [enddate, setEnddate] = useState(null)
  const [recruitmentperiod, setRecruitmentperiod] = useState(false)
  const [job, setJob] = useState([])

  // 이미지 upload useState
  const [image, setImg] = useState(null)
  const [logo, setLogo] = useState(null)

  // 이미지 미리보기 upload useState
  const [viewLogo, setViewLogo] = useState('')
  const [viewImg, setViewImg] = useState('')
  const logoFileInputRef = useRef()
  const imgFileInputRef = useRef()

  const [incruittype, setIncruittype] = useState('')
  const [jobdetail, setJobdetail] = useState('')

  const { isLoading, isError, data } = useQuery('detail', () =>
    getRecruit(param.id)
  )
  // useEffect가 undefined인지 아닌지 확인해서 undefined가 아닐 때 세팅을 다시
  useEffect(() => {
    setTitle(data?.nickname)
    setDescription(data?.description)
    setStartDate(data?.startDate)
    setEnddate(data?.lastDate)
    // 안 될 것 같긴 함
    // setImg(data?.image)
    // setLogo(data?.logo)

    // setJob([data?.job])
  }, [data])

  const addJobHandler = () => {
    if (incruittype !== '' && jobdetail !== '') {
      if (window.confirm('고용 내용을 추가하시겠습니까?') === true) {
        const newJob = {
          incruittype,
          jobdetail,
        }

        setJobdetail('')
        setJob([...job, newJob])
      } else {
        return
      }
    } else {
      alert('채용 형태와 담당할 업무를 모두 작성해주세요')
    }
  }

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
  const ImgInputHandler = (e) => {
    setImg(e.target.files[0])
    const file = imgFileInputRef.current.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setViewImg(reader.result)
    }
  }

  const queryClient = useQueryClient()
  const updateMutation = useMutation(updateIncruit, {
    onSuccess: () => {
      queryClient.invalidateQueries('recruits')
    },
  })

  // 수정 완료 버튼 클릭시
  const updateButton = (id) => {
    if (window.confirm('수정하시겠습니까?') === true) {
      const formData = new FormData()

      const newData = {
        title,
        description,
        companytype,
        startdate,
        enddate,
        recruitmentperiod,
        job,
      }

      const json = JSON.stringify(newData)
      const blob = new Blob([json], { type: 'application/json' })
      formData.append('data', blob)

      formData.append('logo', logo)
      formData.append('image', image)

      updateMutation.mutate({ formData, id })
      navigate('/detail')
    } else {
      return
    }
  }
  // 취소 버튼 클릭시
  const cancelButton = () => {
    if (window.confirm('작성을 취소하시겠습니까? 메인 화면으로 돌아갑니다') === true) {
      navigate('/')
    } else {
      return
    }
  }

  if (isLoading) return <h1>로딩중</h1>
  if (isError) return <h1>error</h1>

  console.log(data)
  console.log(data.job)

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
              defaultValue={data.nickname}
            />
          </div>
          <div>
            <p>
              <StSpanDate>채용기간 시작 날짜</StSpanDate>
              <input
                type="date"
                id="startDate"
                onChange={(e) => setStartDate(e.target.value)}
                defaultValue={data.startDate}
              />
            </p>

            <p>
              <StSpanDate>채용기간 마감 날짜</StSpanDate>
              <input
                type="date"
                id="endDate"
                onChange={(e) => setEnddate(e.target.value)}
                defaultValue={data.lastDate}
              />
            </p>
          </div>
          <div>
            {recruitmentperiod === false ? (
              <StDivRecruitTentperiodFalse
                onClick={() => setRecruitmentperiod(!recruitmentperiod)}
              >
                상시 모집 버튼
              </StDivRecruitTentperiodFalse>
            ) : (
              <StDivRecruitTentperiodTrue
                onClick={() => setRecruitmentperiod(!recruitmentperiod)}
              >
                상시 모집 버튼
              </StDivRecruitTentperiodTrue>
            )}
            <div style={{ marginTop: '30px' }}>
              <select onChange={(e) => setCompanyType(e.target.value)}>
                <option>기업의 형태를 지정해주세요</option>
                <option value="대기업">대기업</option>
                <option value="중견기업">중견기업</option>
                <option value="공공기관">공공기관</option>
                <option value="기타기업">기타기업</option>
              </select>
            </div>
          </div>
        </StDivInfo>
      </StDivContainer>
      <div>
        <StDivJob>
          <select onChange={(e) => setIncruittype(e.target.value)}>
            <option>채용 형태를 지정해주세요</option>
            <option>신입</option>
            <option>경력</option>
            <option>인턴</option>
            <option>계약직</option>
          </select>
          <StInputJobdetail
            type="text"
            name="jobdetail"
            placeholder="담당할 업무를 작성해주세요"
            value={jobdetail}
            onChange={(e) => setJobdetail(e.target.value)}
          />
          <StBtnJob onClick={addJobHandler}>추가하기</StBtnJob>
        </StDivJob>
        <StDivJobContent>
          {job.map((job, i) => {
            return (
              <StDivResultContent key={`${job}_${i}`}>
                {/* id값이 아닌 다른걸 사용 */}
                <StSpanTpye>고용 형태 : {job.incruittype}</StSpanTpye>
                <StSpanJobdetail>담당할 업무 : {job.jobdetail}</StSpanJobdetail>
              </StDivResultContent>
            )
          })}
        </StDivJobContent>
      </div>
      <div>
        <StImg src={viewImg ? viewImg : null} />
        <StLabelImg htmlFor="img">공고 이미지를 업로드 해주세요</StLabelImg>
        <input
          hidden
          ref={imgFileInputRef}
          name="img"
          id="img"
          type="file"
          onChange={ImgInputHandler}
        />
      </div>
      <StDivRecruitContent>
        <StTARecruitContent
          type="text"
          name="description"
          placeholder="내용을 작성해주세요"
          defaultValue={data.description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </StDivRecruitContent>
      <StDivLast>
        <StBtnAdd onClick={() => updateButton(param.id)}>수정 완료</StBtnAdd>
        <StBtnAdd onClick={cancelButton}>취소</StBtnAdd>
      </StDivLast>
    </StDivWrap>
  )
}

export default Update

const StDivWrap = styled.div`
  width: 750px;
  padding: 45px 0px;
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
  height: 170px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 25px;
  border: solid 1px #ddd;
  font-size: 16px;
`

// logo img
const StDivLogoimg = styled.div`
  width: 90px;
  height: 140px;
  margin-right: 30px;
  float: left;
`
const StLabelLogo = styled.label`
  width: 101px;
  height: 35px;
  margin-right: 30px;
  float: left;
  border: 1px solid #ff6813;
  font-size: 12px;
  color: #ff6813;
  text-align: center;
  position: absolute;
  top: 170px;
  cursor: pointer;
`

// 컨테이너 input들
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
const StSpanDate = styled.span`
  margin-right: 30px;
`

// 상시 모집 onClick
const StDivRecruitTentperiodFalse = styled.div`
  position: absolute;
  width: 120px;
  padding: 5px;
  text-align: center;
  left: 350px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background-color: white;
  color: black;
  border-radius: 10px;
  cursor: pointer;
`
const StDivRecruitTentperiodTrue = styled.div`
  position: absolute;
  width: 120px;
  padding: 5px;
  text-align: center;
  left: 350px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 10px;
  cursor: pointer;
`
// select job
const StDivJob = styled.div`
  float: right;
  width: 685px;
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`
const StInputJobdetail = styled.input`
  width: 300px;
  padding: 7px;
  margin-left: 30px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  :focus {
    outline: 1px solid rgba(0, 0, 0, 0.3);
  }
`
const StBtnJob = styled.button`
  width: 100px;
  padding: 7px;
  margin-left: 50px;
  border: 1px solid #ff6813;
  border-radius: 10px;
  background-color: white;
  color: #ff6813;
  :hover {
    background-color: #ff6813;
    color: white;
  }
  cursor: pointer;
`
// 채용 공고 올린 내용
const StDivJobContent = styled.div`
  float: right;
  width: 700px;
`
const StDivResultContent = styled.div`
  width: 685px;
  float: right;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`
const StSpanTpye = styled.span`
  margin-left: 20px;
`
const StSpanJobdetail = styled.span`
  margin-left: 160px;
`

// 채용 공고 img
const StLabelImg = styled.label`
  width: 705px;
  height: 40px;
  margin: 0px 0px;
  float: right;
  text-align: center;
  line-height: 40px;
  background-color: #e8a35a;
  color: #fff;
  cursor: pointer;
  :hover {
    background-color: #be7f3c;
  }
`
const StImg = styled.img`
  width: 705px;
  height: 600px;
  margin: 30px 0px;
  float: right;
  border: 3px dashed #dbdbdb;
`

// 채용 공고 내용
const StDivRecruitContent = styled.div`
  margin: 30px 0px 0px 40px;
  width: 705px;
  float: right;
`
const StTARecruitContent = styled.textarea`
  width: 687px;
  padding: 10px;
  height: 400px;
  :focus {
    outline: 1px solid rgba(0, 0, 0, 0.3);
  }
`
// last button
const StDivLast = styled.div`
  float: right;
  margin: 30px 0px 100px 0px;
  width: 705px;
`
const StBtnAdd = styled.button`
  margin-left: 70px;
  padding: 5px;
  width: 250px;
  border: 1px solid #ff6813;
  color: #ff6813;
  background-color: #fafafa;
  cursor: pointer;
`
