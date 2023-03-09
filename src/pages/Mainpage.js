import React, { useEffect, useRef, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'
import { getMainpage } from '../api/mainpageapi'
import Header from './Header'
import { getUser, removeUser } from '../util/localstorage'

function Mainpage() {
  const userInfo = getUser()
  console.log(userInfo)
  const { isLoading, isError, data } = useQuery('main', getMainpage)
  if (isLoading) return <h1>로딩중</h1>
  if (isError) return <h1>에러</h1>
  console.log(data)
  console.log(data[0].title)

  return (
    <>
      <GlobalStyle />
      <Container>
        <ChatCtrl></ChatCtrl>
        <MainBanner>
          <CopyWrapper>
            <BannerContainer>
              <BannerImg to={'https://www.samsungcareers.com/hr/?no=3059'} >
                <img alt='' src='https://daoift3qrrnil.cloudfront.net/ggs/images/22710/original/%E1%84%89%E1%85%A1%E1%86%B7%E1%84%89%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%A9%E1%84%85%E1%85%A9%E1%84%8C%E1%85%B5%E1%86%A8%E1%84%89%E1%85%B3_PC%E1%84%86%E1%85%A6%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%87%E1%85%A2%E1%84%82%E1%85%A5_2%29%E1%84%8E%E1%85%A2%E1%84%8B%E1%85%AD%E1%86%BC.png?1678250383'></img>
              </BannerImg>
            </BannerContainer>
          </CopyWrapper>
        </MainBanner>
        <CompanySearch>
          <SearchWrapper>
            <SearchArea>
              <SearchInput placeholder="채용 공고를 찾아보세요" />
              <img
                alt="돋보기"
                src="https://d2bovrvbszerbl.cloudfront.net/assets/icons/magnifying-glass-2x-a328874fc9f3460c90b2d7e82f71a71f318bc62d773514543c13463dff2bd779.png"
              />
              <RecruitAdvertise>
                <span>인바디 2023 상반기 수시채용</span>
              </RecruitAdvertise>
              <RecruitAdvertise>
                <span>삼성에스원 3급 신입 채용</span>
              </RecruitAdvertise>
              <RecruitAdvertise>
                <span>현대그룹 상반기 신입 매니저 채용</span>
              </RecruitAdvertise>
            </SearchArea>
          </SearchWrapper>
        </CompanySearch>
        <CompanyRecommend>
          <RecommendWrapper>
            <RecommendTitle>
              이용 패턴에 맞게 준비했어요, 맞춤 공고
              <span>SPONSORED</span>
            </RecommendTitle>
            <RecommendGroups>
              <GroupsAd>
                <GroupsAdTitle>
                  <span>자소설닷컴 추천 공고 🤖</span>
                </GroupsAdTitle>
                <GroupsAdItems>
                  {data.slice(0, 4).map((el) => (
                    <AdItemsWrapper>
                      <AdItems>
                        <AdItemLogo>
                          <img alt="로고" src={el.logo} />
                        </AdItemLogo>
                        <AdItemName>{el.nickname}</AdItemName>
                        <AdItemTitle>{el.jobdetail}</AdItemTitle>
                        <AdItemEndtime>{el.viewconut}회 방문함</AdItemEndtime>
                      </AdItems>
                      <div className="color-bar"></div>
                    </AdItemsWrapper>
                  ))}
                </GroupsAdItems>
              </GroupsAd>
              <GroupsRecommend>
                <GrroupsRdItems>
                  <RdTitle style={{backgroundColor: '#f4f5ff'}}>
                    <span className="group-title-from">
                      현대자동차 Manufacturing_구구구구구구
                    </span>
                    <span className="group-title-message">
                      지원자가 많이 쓴
                    </span>
                  </RdTitle>
                  <RdItmesWrapper>
                    {data.slice(0, 5).map((el) => (
                      <RdItems>
                        <RdItemName>{el.nickname}</RdItemName>
                        <RdItemTitle>
                          {el.jobdetail}
                        </RdItemTitle>
                        <RdItemEndtime>{el.viewconut}회 조회</RdItemEndtime>
                        <RdItemLogo>
                          <img src={el.logo} alt="로고" />
                        </RdItemLogo>
                      </RdItems>
                    ))}
                  </RdItmesWrapper>
                </GrroupsRdItems>
                <GrroupsRdItems>
                  <RdTitle style={{backgroundColor: 'rgba(193,133,255,0.08)'}}>
                    <span className="group-title-from">웹개발</span>
                    <span className="group-title-message">
                      관심 지원자가 많이 쓴
                    </span>
                  </RdTitle>
                  <RdItmesWrapper>
                    {data.slice(6, 11).map((el) => (
                      <RdItems>
                        <RdItemName>{el.nickname}</RdItemName>
                        <RdItemTitle>
                        {el.jobdetail} 
                        </RdItemTitle>
                        <RdItemEndtime>{el.viewconut}회 조회</RdItemEndtime>
                        <RdItemLogo>
                          <img src={el.logo} alt="로고" />
                        </RdItemLogo>
                      </RdItems>
                    ))}
                  </RdItmesWrapper>
                </GrroupsRdItems>
                <GrroupsRdItems>
                  <RdTitle style={{backgroundColor: 'rgba(63,77,94,0.08)'}}>
                    <span className="group-title-from">서버개발</span>
                    <span className="group-title-message">
                      전공자가 많이 쓴
                    </span>
                  </RdTitle>
                  <RdItmesWrapper>
                    {data.slice(12, 17).map((el) => (
                      <RdItems>
                        <RdItemName>{el.nickname}</RdItemName>
                        <RdItemTitle>
                        {el.jobdetail}
                        </RdItemTitle>
                        <RdItemEndtime>{el.viewconut}회 조회</RdItemEndtime>
                        <RdItemLogo>
                          <img src={el.logo} alt="로고" />
                        </RdItemLogo>
                      </RdItems>
                    ))}
                  </RdItmesWrapper>
                </GrroupsRdItems>
                <GrroupsRdItems>
                  <RdTitle style={{backgroundColor: 'rgba(48,50,99,0.08)'}}>
                    <span className="group-title-from">3일이내</span>
                    <span className="group-title-message">
                      자소서가 많이 작성된
                    </span>
                  </RdTitle>
                  <RdItmesWrapper>
                    {data.slice(18, 23).map((el) => (
                      <RdItems>
                        <RdItemName>{el.nickname}</RdItemName>
                        <RdItemTitle>
                        {el.jobdetail}
                        </RdItemTitle>
                        <RdItemEndtime>{el.viewconut}회 조회</RdItemEndtime>
                        <RdItemLogo>
                          <img src={el.logo} alt="로고" />
                        </RdItemLogo>
                      </RdItems>
                    ))}
                  </RdItmesWrapper>
                </GrroupsRdItems>
                <GrroupsRdItems>
                  <RdTitle style={{backgroundColor: '#F4F5FF'}}>
                    <span className="group-title-from">꿀직장</span>
                    <span className="group-title-message">
                      학생이 많이 쓴
                    </span>
                  </RdTitle>
                  <RdItmesWrapper>
                    {data.slice(24, 29).map((el) => (
                      <RdItems>
                        <RdItemName>{el.nickname}</RdItemName>
                        <RdItemTitle>
                        {el.jobdetail}
                        </RdItemTitle>
                        <RdItemEndtime>{el.viewconut}회 조회</RdItemEndtime>
                        <RdItemLogo>
                          <img src={el.logo} alt="로고" />
                        </RdItemLogo>
                      </RdItems>
                    ))}
                  </RdItmesWrapper>
                </GrroupsRdItems>
                <GrroupsRdItems>
                  <RdTitle style={{backgroundColor: 'rgba(193,133,255,0.08)'}}>
                    <span className="group-title-from">딥러닝</span>
                    <span className="group-title-message">
                      관심 지원자가 많이 쓴
                    </span>
                  </RdTitle>
                  <RdItmesWrapper>
                    {data.slice(30, 35).map((el) => (
                      <RdItems>
                        <RdItemName>{el.nickname}</RdItemName>
                        <RdItemTitle>
                        {el.jobdetail}
                        </RdItemTitle>
                        <RdItemEndtime>{el.viewconut}회 조회</RdItemEndtime>
                        <RdItemLogo>
                          <img src={el.logo} alt="로고" />
                        </RdItemLogo>
                      </RdItems>
                    ))}
                  </RdItmesWrapper>
                </GrroupsRdItems>
              </GroupsRecommend>
            </RecommendGroups>
            <img
              className="groups-controller right ng-scope"
              alt="화살표"
              src="https://d2bovrvbszerbl.cloudfront.net/assets/index/right-arrow-in-circle-9a4174c39bd603184c9b2fcca76b9781ad279b367b09e65f8c2aa8ccc2da04b7.png"
            ></img>
          </RecommendWrapper>
        </CompanyRecommend>
        <PersonalSection>
          <UserSection>
            <SectionHeader>
              <span>유저 닉네임</span>
              <span>님의 요즘 취업 준비</span>
            </SectionHeader>
            <SectionContents>
              <UserRecruit>
                <div>
                  <UserRecruitLink to={'/'}>
                    <span>곧 마감하는 내 관심공고</span>
                    <img
                      src="https://d2bovrvbszerbl.cloudfront.net/assets/index/feather-arrow-right-f9fa5a9fc53998cd68e16e5713ab2773ad4e7ebed7467be8ea169431e4738836.png"
                      alt="화살표"
                    ></img>
                  </UserRecruitLink>
                  <div>
                    <EmptyRecruitLink to={'/'}>
                      <span>관심공고 추가</span>
                      <img
                        src="https://d2bovrvbszerbl.cloudfront.net/assets/index/plus_icon_small-aed89630b197f032515afea5e81206ac633bf622bebb8534be21925e9c54954c.png"
                        alt="플러스"
                      ></img>
                    </EmptyRecruitLink>
                    <EmptyRecruitLink to={'/'}>
                      <img
                        src="https://d2bovrvbszerbl.cloudfront.net/assets/index/plus_icon_small-aed89630b197f032515afea5e81206ac633bf622bebb8534be21925e9c54954c.png"
                        alt="플러스"
                      ></img>
                    </EmptyRecruitLink>
                  </div>
                </div>
              </UserRecruit>
              <UserResumes>
                <div>
                  <UserRecruitLink to={'/'}>
                    <span>곧 마감하는 내 관심공고</span>
                    <img
                      src="https://d2bovrvbszerbl.cloudfront.net/assets/index/feather-arrow-right-f9fa5a9fc53998cd68e16e5713ab2773ad4e7ebed7467be8ea169431e4738836.png"
                      alt="화살표"
                    ></img>
                  </UserRecruitLink>
                  <ResumesBody>
                    <ResumesLink to={'/'}>
                      <div>
                        <ResumesName>
                          현대자동차 Manufacturing_구매·부품개발_전자부품 구매
                        </ResumesName>
                        <ResumesDday>5일 남음</ResumesDday>
                      </div>
                      <ResumesUnderBar></ResumesUnderBar>
                    </ResumesLink>
                    <EmptyResumesLink to={'/'}>
                      <div>
                        <ResumesIcon>
                          <img
                            src="https://d2bovrvbszerbl.cloudfront.net/assets/index/plus_icon_small-aed89630b197f032515afea5e81206ac633bf622bebb8534be21925e9c54954c.png"
                            alt="플러스"
                          ></img>
                        </ResumesIcon>
                        <ResumeText>
                          <span>
                            공고 둘러보고
                            <br />
                            자기소개서 추가
                          </span>
                        </ResumeText>
                      </div>
                    </EmptyResumesLink>
                    <EmptyResumesLink to={'/'}>
                      <div>
                        <ResumesIcon>
                          <img
                            src="https://d2bovrvbszerbl.cloudfront.net/assets/index/plus_icon_small-aed89630b197f032515afea5e81206ac633bf622bebb8534be21925e9c54954c.png"
                            alt="플러스"
                          ></img>
                        </ResumesIcon>
                      </div>
                    </EmptyResumesLink>
                    <EmptyResumesLink to={'/'}>
                      <div>
                        <ResumesIcon>
                          <img
                            src="https://d2bovrvbszerbl.cloudfront.net/assets/index/plus_icon_small-aed89630b197f032515afea5e81206ac633bf622bebb8534be21925e9c54954c.png"
                            alt="플러스"
                          ></img>
                        </ResumesIcon>
                      </div>
                    </EmptyResumesLink>
                  </ResumesBody>
                </div>
              </UserResumes>
            </SectionContents>
          </UserSection>
        </PersonalSection>
        <CompanyStory>
          <CompanyStoryContainer>
            <StoryTitle>
              <img
                alt="불"
                src="https://d2bovrvbszerbl.cloudfront.net/assets/index/famous-chat-icon-57650baf83ebd71aaf452175a70ca47e4f04246b0de20c305b64bfbc6a85f085.png"
              />
              요즘 취준, 요즘 면접
              <img
                alt="불"
                src="https://d2bovrvbszerbl.cloudfront.net/assets/index/famous-chat-icon-57650baf83ebd71aaf452175a70ca47e4f04246b0de20c305b64bfbc6a85f085.png"
              />
            </StoryTitle>
            <StoryBody>
              <StoryHighlight>
                <StoryWapper>
                  <StoryThumbnail>
                    <img
                      src="https://i.ytimg.com/vi/wiWvh1_KR2Y/mqdefault.jpg"
                      alt="썸네일"
                    />
                    <div>
                      <img
                        src="https://d2bovrvbszerbl.cloudfront.net/assets/icons/play-btn-icon-2x-0d27b8ddeb31c22aaf7ffe90b44c01b222b0fb9746f4a5fbf54f5f15d1e851d6.png"
                        alt="재생버튼"
                      />
                      <span>2:41</span>
                    </div>
                  </StoryThumbnail>
                  <StoryThumbnailTitle>
                    <div>
                      영어면접, 대기업 합격하는 영어 1분 자기소개의 모든것 (w.
                      대기업 현직자){' '}
                    </div>
                  </StoryThumbnailTitle>
                </StoryWapper>
              </StoryHighlight>
              <StoryLists>
                <StoryList>
                  <StoryListLink to={'https://youtube.com/shorts/paKx_gaJjnw'}>
                    <img
                      alt="문서이미지"
                      src="https://jasoseol.com/images/icons/article-icon-2x.png"
                    />
                    <div>
                      <span className="story-title">
                        [Eng] 대기업 영어 면접 1분 자기소개 모범답안
                        #영어1분자기소개
                      </span>
                      <span className="story-name">취진스</span>
                    </div>
                  </StoryListLink>
                </StoryList>
                <StoryList>
                  <StoryListLink to={'https://youtu.be/9NGgBmWpjjE'}>
                    <img
                      alt="문서이미지"
                      src="https://jasoseol.com/images/icons/article-icon-2x.png"
                    />
                    <div>
                      <span className="story-title">
                        요즘면접 트렌드 총정리 (ft. 대기업 합격자들이 알려주는
                        면접 팁)
                      </span>
                      <span className="story-name">취진스</span>
                    </div>
                  </StoryListLink>
                </StoryList>
                <StoryList>
                  <StoryListLink to={'https://youtube.com/shorts/paKx_gaJjnw'}>
                    <img
                      alt="문서이미지"
                      src="https://jasoseol.com/images/icons/article-icon-2x.png"
                    />
                    <div>
                      <span className="story-title">
                        "실제상황" 대기업 인사담당자의 면접 1분 자기소개는 진짜
                        다를까?? 실제로 시켜보았다!! | 대기업 인담자 본인 등판!
                        | 이대로 따라하면..나도 S기업…합격?
                      </span>
                      <span className="story-name">요즘기업_인담터뷰</span>
                    </div>
                  </StoryListLink>
                </StoryList>
                <StoryList>
                  <StoryListLink to={'https://youtube.com/shorts/paKx_gaJjnw'}>
                    <img
                      alt="문서이미지"
                      src="https://jasoseol.com/images/icons/article-icon-2x.png"
                    />
                    <div>
                      <span className="story-title">
                        대기업 공채, 결국 OOOO이 답이다 (fact. 대기업
                        홍보담당자) | 취진스 Ep.01 | 요즘면접(YZMZ)
                      </span>
                      <span className="story-name">취진스</span>
                    </div>
                  </StoryListLink>
                </StoryList>
                <StoryList>
                  <StoryListLink to={'https://youtube.com/shorts/paKx_gaJjnw'}>
                    <img
                      alt="문서이미지"
                      src="https://jasoseol.com/images/icons/article-icon-2x.png"
                    />
                    <div>
                      <span className="story-title">
                        서울대 졸업하고 세상을 바꾸겠다는 이 청년, 10년 후 지금
                        뭐하고 있을까?
                      </span>
                      <span className="story-name">요즘CEO</span>
                    </div>
                  </StoryListLink>
                </StoryList>
              </StoryLists>
            </StoryBody>
          </CompanyStoryContainer>
        </CompanyStory>
        <LineBanner>
          <BannerLink
            to={
              'https://tally.so/r/nW2EkN?utm_source=jasoseol&utm_medium=hl_banner'
            }
          >
            <img
              alt="배너이미지"
              src="https://daoift3qrrnil.cloudfront.net/ggs/images/25082/original/PC_%E1%84%92%E1%85%A9%E1%86%B7%E1%84%84%E1%85%B5%281200_100%29.png?1678078816"
            ></img>
          </BannerLink>
        </LineBanner>
        <SectionTop>
          <SectionContainer>
            <SectionTitle>직무별 인기 공고</SectionTitle>
          </SectionContainer>
        </SectionTop>
        <SectionTop>
          <SectionContainer>
            <SectionTitle>최근 게시된 인기 공고 TOP 24</SectionTitle>
          </SectionContainer>
        </SectionTop>
        <SectionTop>
          <SectionContainer>
            <SectionTitle>곧 마감하는 인기 공고 TOP 24</SectionTitle>
          </SectionContainer>
        </SectionTop>
        <ChatSection>
          <ChatSectionTitle>
            <div>불타오르는 채팅방</div>
            <img
              alt="불꽃"
              src="https://d2bovrvbszerbl.cloudfront.net/assets/index/famous-chat-icon-57650baf83ebd71aaf452175a70ca47e4f04246b0de20c305b64bfbc6a85f085.png"
            />
          </ChatSectionTitle>
          <ChatSectionBody>
            <ChatMain></ChatMain>
            <ChatSub></ChatSub>
          </ChatSectionBody>
        </ChatSection>
        <DatalabSection>
          <ChatSectionTitle>
            <div>실시간 지원자 정보 분석, 데이터랩</div>
            <img
              alt="데이터"
              src="https://d2bovrvbszerbl.cloudfront.net/assets/index/datalab_icon-22d23b2f6ad031bb54017ff2f8704e5ff5c472a90d76f29580e70f0b8957ee9a.png"
            />
          </ChatSectionTitle>
          <DataSectionBody>
            <DataMain></DataMain>
            <DataSub></DataSub>
          </DataSectionBody>
        </DatalabSection>
        <FooterSection>
          <FooterContainer>
            <InformationContainer>
              <div>
                <span>
                  주식회사 앵커리어
                  <IoIosArrowDown className="material-icons" />
                </span>
              </div>
            </InformationContainer>
            <ServicesContainer>
              <AnchoreerWrapper>
                <AnchoreerTitle>자소설닷컴</AnchoreerTitle>
                <AnchoreerCategoty>
                  <AnchoreerService>
                    <AnchorerrLink to={'/'}>공지사항</AnchorerrLink>
                  </AnchoreerService>
                  <AnchoreerService>
                    <AnchorerrLink to={'/'}>공고등록요청</AnchorerrLink>
                  </AnchoreerService>
                  <AnchoreerService>
                    <AnchorerrLink to={'/'}>자소서블로그</AnchorerrLink>
                  </AnchoreerService>
                </AnchoreerCategoty>
              </AnchoreerWrapper>
              <AnchoreerWrapper>
                <AnchoreerTitle>기업서비스</AnchoreerTitle>
                <AnchoreerCategoty>
                  <AnchoreerService>
                    <AnchorerrLink to={'/'}>채용공고등록</AnchorerrLink>
                  </AnchoreerService>
                  <AnchoreerService>
                    <AnchorerrLink to={'/'}>광고예약</AnchorerrLink>
                  </AnchoreerService>
                  <AnchoreerService>
                    <AnchorerrLink to={'/'}>광고/제휴</AnchorerrLink>
                  </AnchoreerService>
                </AnchoreerCategoty>
              </AnchoreerWrapper>
            </ServicesContainer>
            <hr />
            <AdditionalContainer>
              <TermsWrapper>
                <div>
                  <TermsLink to={'/'}>인재채용</TermsLink>
                </div>
                <div>
                  <TermsLink to={'/'}>이용약관</TermsLink>
                </div>
                <div>
                  <TermsLink to={'/'}>개인정보처리방침</TermsLink>
                </div>
                <div>
                  <TermsLink to={'/'}>커뮤니티운영정책</TermsLink>
                </div>
                <div>
                  <TermsLink to={'/'}>FAQ</TermsLink>
                </div>
                <div>
                  <TermsLink to={'/'}>문의</TermsLink>
                </div>
                <div>
                  <TermsLink to={'/'}>© Anchoreer</TermsLink>
                </div>
              </TermsWrapper>
              <AppStoreWrapper>
                <GoogleLink
                  to={
                    'https://play.google.com/store/apps/details?id=com.anchoreer.jasoseol&referrer=utm_source%3D2003chatlanding'
                  }
                >
                  <img
                    alt="앱이미지"
                    src="https://d2bovrvbszerbl.cloudfront.net/assets/index/download-google-play-2x-44dea8fd6d223a0df9a032057fe9f9e2cef8fd0bf2a76740322b199e476dbb5e.png"
                  ></img>
                </GoogleLink>
                <AppStoreLink
                  to={
                    'https://apps.apple.com/app/apple-store/id1082085895?pt=15600800&ct=2003chatlanding&mt=8'
                  }
                >
                  <img
                    alt="앱이미지"
                    src="https://d2bovrvbszerbl.cloudfront.net/assets/index/download-app-store-2x-a1bc87c1d30268a66c8222e5764cce730101156a21d8fa0b228abd40db138424.png"
                  ></img>
                </AppStoreLink>
              </AppStoreWrapper>
            </AdditionalContainer>
          </FooterContainer>
        </FooterSection>
      </Container>
    </>
  )
}

export default Mainpage

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
`

const Container = styled.div`
  position: relative;
  top: 35px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.428571429;
`
const ChatCtrl = styled.div`
  width: 250px;
  font-size: 12px;
  position: fixed;
  top: 52px;
  height: calc(100% - 52px);
  margin: 0 0 0 0;
  background: gainsboro;
  border-left: 1px solid #dddddd;
  z-index: 100;
  transition: right 0.5s;
  right: -230px;
`
const MainBanner = styled.div`
  position: relative;
  width: 1200px;
  height: 280px;
  margin: 24px auto 0;
  border-radius: 12px;
  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08));
`

const CopyWrapper = styled.div`
  text-align: center;
  padding-top: 120px;
`
const BannerContainer =styled.div`
position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    z-index: 1;
    transition: opacity 1.5s;
`
const BannerImg = styled(Link)`
    display: inline-block;
    width: 100%;
    height: 280px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 12px;
    border: 1px solid #EEEEEE;
`

// const BannerController = styled.div`
// position: absolute;
//     bottom: 16px;
//     right: 16px;
//     width: 124px;
//     display: flex;
//     z-index: 1000;
//     background: #FFFFFF;
//     border: 1px solid #EEEEEE;
//     border-radius: 20px;
//     user-select: none;
// `

const CompanySearch = styled.div`
  position: relative;
  width: 100%;
  min-width: 1200px;
`

const SearchWrapper = styled.div`
  display: flex;
  width: 1200px;
  height: 80px;
  margin: 16px auto 60px;
  border-bottom: 2px solid #333333;
  cursor: text;
`

const SearchArea = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  & > img {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
  }
`
const SearchInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 20px 810px 20px 42px;
  border: none;
  background: transparent;
  font-size: 18px;
  outline: none;

  &::placeholder {
    color: #bbb;
  }
`
const RecruitAdvertise = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 260px;
  height: 44px;
  margin: 0 5px;
  background: #fafafa;
  padding: 0 10px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  color: #777777;
  cursor: pointer;
`
const CompanyRecommend = styled.div`
  padding: 0 0 60px;
  overflow: hidden;
  position: relative;
  width: 100%;
  min-width: 1200px;
`

const RecommendWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  position: relative;

  & > .groups-controller {
    cursor: pointer;
    right: -220px;
    width: 78px;
    height: 78px;
    border-radius: 100%;
    position: absolute;
    top: 660px;
  }
`

const RecommendTitle = styled.div`
  color: #333;
  font-size: 26px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 99px;
    height: 24px;
    border-radius: 4px;
    background: #fafafa;
    font-size: 12px;
    color: #bbbbbb;
    font-weight: 800;
  }
`

const RecommendGroups = styled.div`
  margin-top: 32px;
  position: relative;
`

const GroupsAd = styled.div`
  margin-bottom: 24px;
`
const GroupsAdTitle = styled.div`
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  color: #555555;

  & > span {
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    color: #555555;
  }
`
const GroupsAdItems = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const AdItemsWrapper = styled.div`
  margin-right: 24px;
  position: relative;
  flex: 1;
  min-width: 0;

  &:nth-child(4) {
    margin-right: 0px;
  }

  & > .color-bar {
    background-color: #3f4d5e;
    position: absolute;
    bottom: -1px;
    width: 100%;
    height: 8px;
    border-radius: 0 0 8px 8px;
  }
`
const AdItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 12px 16px 24px 16px;
  border-radius: 8px;
  border: 1px solid #dddddd;
  box-shadow: 0px 2px 4px rgb(0 0 0 / 8%);
`
const AdItemLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 84px;
  margin-bottom: 4px;
  border-radius: 8px;

  & > img {
    max-width: 112px;
    max-height: 84px;
  }
`
const AdItemName = styled.div`
  font-weight: 600;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  margin-bottom: 2px;
  text-align: center;
  font-size: 16px;
  color: #555555;
`

const AdItemTitle = styled.div`
  font-weight: 350;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  margin-bottom: 2px;
  text-align: center;
  font-size: 16px;
  color: #555555;
`
const AdItemEndtime = styled.div`
  font-size: 14px;
  font-weight: 350;
  line-height: 21px;
  color: #999999;
`

const GroupsRecommend = styled.div`
  position: relative;
  left: 0;
  transition: left 0.5s;
  display: flex;
`
const GrroupsRdItems = styled.div`
  width: 282px;
  min-width: 282px;
  &:nth-child(n + 2) {
    margin-left: 24px;
  }
`
const RdTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 76px;
  padding: 16px 20px;
  border-radius: 12px 12px 0px 0px;

  & > span {
    color: #777777;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }

  & > .group-title-from {
    max-width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const RdItmesWrapper = styled.div`
  margin-top: 12px;
`

const RdItems = styled.div`
  margin-top: 10px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  width: 282px;
  height: 115px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`

const RdItemName = styled.div`
  color: #333;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const RdItemTitle = styled.div`
  color: #555;
  font-size: 15px;
  font-weight: 350;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const RdItemEndtime = styled.div`
  color: #999;
  font-size: 14px;
  font-weight: 350;
`

const RdItemLogo = styled.div`
  position: absolute;
  right: 20px;
  bottom: 10px;
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    max-width: 40px;
    max-height: 30px;
  }
`

const PersonalSection = styled.div`
  width: 1200px;
  margin: 80px auto 60px;
  position: relative;
  min-width: 1200px;
  overflow: hidden;
`

const UserSection = styled.div``

const SectionHeader = styled.div`
  display: flex;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 30px;
`

const SectionContents = styled.div`
  display: flex;
  justify-content: space-between;
`

const UserRecruit = styled.div`
  width: 32%;
  height: 215px;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
`
const UserRecruitLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  color: #777;
  &:hover {
    text-decoration: underline;
  }
  & > img {
    width: 7px;
    height: 14px;
  }
`

const EmptyRecruitLink = styled(Link)`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bbbbbb;
  background: #fff;
  border: 2px dashed #eee;
  border-radius: 5px;
  margin-bottom: 11px;
  text-decoration: none;
  & > span {
    margin-right: 5px;
  }
  & > img {
    width: 12px;
    height: 12px;
  }
`

const UserResumes = styled.div`
  width: 66%;
  height: 215px;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
`
const ResumesBody = styled.div`
  display: flex;
  justify-content: space-between;

  &:nth-chile(n + 2) {
    position: relative;
    border: 2px dashed #eee;
    padding: 26px 37px;
    border-radius: 5px;
    text-decoration: none;
  }
`

const ResumesLink = styled(Link)`
  width: 180px;
  height: 132px;
  background: #fff;
  border: 1px solid #eee;
  padding: 15px 20px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 400;
  &:hover {
    font-weight: 600;
  }
`
const EmptyResumesLink = styled(Link)`
  position: relative;
  width: 180px;
  height: 132px;
  background: #fff;
  border: 2px dashed #eee;
  padding: 26px 37px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ResumesName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  font-weight: inherit;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4em;
  max-height: 4.2em;
  overflow: hidden;
`
const ResumesDday = styled.div`
  color: #999;
  font-weight: 350;
`

const ResumesUnderBar = styled.div`
  height: 6px;
  box-shadow: none;
  margin-bottom: 0;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius: 4px;
`
const ResumesIcon = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ResumeText = styled.div`
  height: 48px;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  & > span {
    color: #bbbbbb;
    word-break: keep-all;
    text-align: center;
  }
`

const CompanyStory = styled.div`
  padding: 80px 0 60px;
  position: relative;
  width: 100%;
  min-width: 1200px;
  overflow: hidden;
`

const CompanyStoryContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`

const StoryTitle = styled.div`
  font-size: 26px;
  font-weight: bold;
  display: flex;
  align-items: center;
`

const StoryBody = styled.div`
  display: flex;
  margin-top: 25px;
  height: 265px;
`
const StoryHighlight = styled.div``

const StoryWapper = styled.div`
  display: block;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  width: 385px;
  text-decoration: none;
`

const StoryThumbnail = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 215px;
  overflow: hidden;

  & > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform 0.1s;
  }

  & > div {
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > div > img {
    width: 34px;
    height: 40px;
  }
  & > div > span {
    position: absolute;
    right: 20px;
    bottom: 10px;
    color: #fff;
    padding: 3px 8px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    letter-spacing: 0.5px;
  }
`
const StoryThumbnailTitle = styled.div`
  height: 50px;
  padding: 0 10px;
  background: #333;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
`

const StoryLists = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 25px);
  margin-left: 25px;
`

const StoryList = styled.div`
  flex: 1 1;
  max-height: 20%;
  cursor: pointer;
`

const StoryListLink = styled(Link)`
  display: flex;
  color: #333;
  text-decoration: none;
  height: 100%;

  & > img {
    width: 20px;
    height: 20px;
    margin: auto 12px;
  }

  & > div {
    display: flex;
    flex: 1;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
  }

  & .story-title {
    flex: 1;
    width: 550px;
    padding: 0 10px;
    font-size: 16px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:hover {
      font-weight: 600;
    }
  }
  & .story-name {
    width: calc(100% - 550px);
    font-size: 14px;
    color: #999;
    text-align: right;
  }
`

const LineBanner = styled.div`
  width: 1200px;
  margin: 0 auto 40px;
  cursor: pointer;
  position: relative;
  min-width: 1200px;
  overflow: hidden;
`

const BannerLink = styled(Link)``

const SectionTop = styled.div`
  position: relative;
  width: 100%;
  min-width: 1200px;
  overflow: hidden;
  background: #fafafa;
`

const SectionContainer = styled.div`
  width: 1200px;
  height: 356px;
  margin: 80px auto 40px;
`

const SectionTitle = styled.div`
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: 600;
  line-height: 1.5;
`

const ChatSectionTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: bold;

  & > img {
    width: 26px;
    height: 26px;
  }
`

const ChatSection = styled.div`
  width: 1200px;
  margin: 80px auto;
  position: relative;
  min-width: 1200px;
  overflow: hidden;
`

const ChatSectionBody = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`
const ChatMain = styled.div`
  display: flex;
  width: 75%;
`
const ChatSub = styled.div`
  width: 23%;
  height: 300px;
  overflow: hidden;
`

const DatalabSection = styled.div`
  width: 1200px;
  margin: 80px auto;
  position: relative;
  min-width: 1200px;
  overflow: hidden;
`
const DataSectionBody = styled.div`
  display: flex;
  justify-content: space-between;
`
const DataMain = styled.div`
  display: flex;
  justify-content: space-between;
  width: 74.5%;
`
const DataSub = styled.div`
  width: 23%;
  height: 156px;
  overflow: hidden;
`

const FooterSection = styled.div`
  background: #fafafa;
  border-top: 1px solid #eeeeee;
  position: relative;
  width: 100%;
  min-width: 1200px;
  overflow: hidden;
`

const FooterContainer = styled.div`
  width: 1200px;
  min-height: 320px;
  margin: 0 auto;
  padding: 40px 0 70px;
  overflow: hidden;

  & > hr {
    margin: 40px 0 15px;
    border: 0;
    border-top: 1px solid #eeeeee;
  }
`

const InformationContainer = styled.div`
  margin-bottom: 30px;

  & > div > span {
    display: inline-flex;
    align-items: center;
    color: #555555;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    cursor: pointer;
    & .material-icons {
      font-family: 'Material Icons';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
    }
  }
`

const ServicesContainer = styled.div`
  margin-bottom: 40px;
`

const AnchoreerWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
`
const AnchoreerTitle = styled.div`
  margin-right: 38px;
  color: #555555;
  font-weight: bold;
`
const AnchoreerCategoty = styled.div`
  display: flex;
  align-items: center;
  margin: 0 -10px 0;
`

const AnchoreerService = styled.div`
  margin: 0 10px;
  cursor: pointer;
`
const AnchorerrLink = styled(Link)`
  color: #555555;
  text-decoration: none;
`

const AdditionalContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const TermsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: -12px;
  & > div {
    margin: 12px;
  }

  & > div:nth-child(3) {
    font-weight: 900;
  }
  & > div:last-child {
    font-weight: 900;
  }
`
const TermsLink = styled(Link)`
  color: #555555;
  text-decoration: none;
`

const AppStoreWrapper = styled.div`
  display: flex;
  align-items: center;
`
const GoogleLink = styled(Link)`
  text-decoration: none;
  & > img {
    width: 130px;
    height: 50px;
  }
`

const AppStoreLink = styled(Link)`
  text-decoration: none;
  & > img {
    width: 114px;
    height: 34px;
  }
`
