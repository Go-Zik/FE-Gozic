import React from 'react'

function DetailRecruit() {
  return (
    <div>
      <div>
        {' '}
        {/* Container */}
        <div>LOGO IMG{/* <img /> */}</div>
        <div>
          <div>
            <p>기업 명</p>
          </div>
          <div>
            <p>2023.02.22 ~ 2023.03.01 (X일 지남)</p>
          </div>
          <div>
            <button>채용 사이트</button>
            <button>채용 공고 공유</button>
            <button>기업 공체 전략</button>
          </div>
          <div>
            <span>공고 조회 1002회</span>
            <span>즐겨찾기 7회</span>
            <span>홈페이지 방문 2회</span>
          </div>
        </div>
      </div>
      {/* JobContent */}
      <div>
        <div>
          <span>고용 형태</span>
          <span>담당할 업무</span>
          <button>자기소개서 쓰기</button>
        </div>
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
    </div>
  )
}

export default DetailRecruit
