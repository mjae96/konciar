# Konciar

한국을 방문한 외국인 여행객을 위한 로컬 예약 및 대리 문의 컨시어지 서비스입니다.

한국어 통화, 국내 본인 인증, 언어 장벽 때문에 식당 예약, 포장 주문, 배달 요청, 병원 문의 등을 직접 처리하기 어려운 사용자를
위해 요청 내용을 구조화해 받고, 운영자가 이메일로 요청을 확인할 수 있도록 만든 웹 프로토타입입니다.

## 주요 기능

- 다국어 지원
  - i18next 기반 영어, 일본어, 중국어 번역 리소스 제공
  - i18next-http-backend를 도입하고 언어 별 번역 데이터를 JSON 파일로 분리해 언어 리소스를 비동기 로드
  <br />
  <div align="center">
    <img width="400" alt="languageChange" src="https://github.com/user-attachments/assets/6cdf2d11-6e89-4828-8661-6519581ff119" />
  </div>

- 요청 유형별 입력 플로우
  - 식당 예약, 포장 주문, 배달 주문, 병원 예약, 정보 문의 등 요청 유형 선택
  - 선택한 요청 유형에 따라 필요한 입력 필드만 표시
  <br />
  <div align="center">
    <img width="400" alt="requestType" src="https://github.com/user-attachments/assets/b7fdce97-9849-4de5-a1b1-10c5f644a9b5" />
  </div>

- 장소 검색
  - Google Maps Places API 기반 장소 및 주소 검색
  - 검색 결과가 없을 경우 직접 입력 지원


- 예약 정보 입력
  - 날짜, 시간, 인원 선택 UI 제공
  - 요청 유형에 따라 필수 입력 조건 분리
  <br />
  <div align="center">
    <img width="400" alt="reservationProcess" src="https://github.com/user-attachments/assets/a99c662f-965f-48ff-98ca-3d9000565fd3" />
  </div>


- 이메일 요청 전송
  - EmailJS를 사용해 별도 서버 없이 사용자 요청을 운영자 이메일로 전송
  <br />
  <div align="center">
    <img width="400" alt="emailImage" src="https://github.com/user-attachments/assets/3574a1d1-b3e4-4fd4-bbf7-b2276c1d0026" />
  </div>


## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- i18next / react-i18next
- Google Maps Places API
- EmailJS
- react-hot-toast
- react-datepicker

## 개발 배경

초기 프로토타입은 단일 HTML 기반 구조였으나, 기능 확장과 유지보수에 한계가 있어 React + Vite 기반 구조로 리팩토링했습니다.

사용자 인터뷰를 통해 자유 입력 방식의 단일 폼이 사용자에게 혼란을 줄 수 있고, 운영자 입장에서도 비정형 데이터를 처리하기 어렵
다는 점을 확인했습니다. 이를 바탕으로 요청 유형별 구조화 폼으로 전환해 사용자 입력 부담을 줄이고, 운영자가 확인하기 쉬운 데이
터 형태로 요청을 수집하도록 개선했습니다.

## 개선 성과

- React + Vite 기반 구조 전환으로 기능 확장성과 개발 생산성 개선
- i18next 기반 다국어 리소스 분리로 번역 관리 구조 개선
- Google Places API 연동으로 외국인 사용자의 장소 입력 정확도 향상
- EmailJS 기반 서버리스 요청 수집 구조로 초기 검증 비용 절감
- Lighthouse Accessibility, Best Practices, SEO 항목 100점 달성

