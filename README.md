# 검색어 추천이 있는 검색창 만들기

## 프로젝트 진행
### 개발자
- 이지정, 곽태훈, 박휘건, 민지원

### 개발 기간
- 2022.05.20 ~ 2022.05.22 (3일간)

## 목차
* [Overview](https://github.com/preOnboarding-5-team/TEAM_5A#overview)
* [실행 화면 및 기능](https://github.com/preOnboarding-5-team/TEAM_5A#실행-화면-및-기능)
* [Directory](https://github.com/preOnboarding-5-team/TEAM_5A#directory)
* [주요 기술 스택](https://github.com/preOnboarding-5-team/TEAM_5A#주요-기술-스택)
* [구현 상세 설명](https://github.com/preOnboarding-5-team/TEAM_5A#구현-상세-설명)
  * [전역 상태 관리](https://github.com/preOnboarding-5-team/TEAM_5A#전역-상태-관리)
  * [Data Fetching](https://github.com/preOnboarding-5-team/TEAM_5A#data-fetching)
  * [반응형 웹 구현](https://github.com/preOnboarding-5-team/TEAM_5A#반응형-웹-구현)
  * [Fuzzy string](https://github.com/preOnboarding-5-team/TEAM_5A#Fuzzy-string)

## Overview
원티드 프리온보딩 코스 5-A조 휴먼스케이프 과제 프로젝트입니다. <br />
[한국임상정보](https://clinicaltrialskorea.com/)의 검색창을 클론 코딩하였고, [공공데이터포털 오픈 API](https://www.data.go.kr/data/15001675/openapi.do)의 데이터를 활용했습니다.

## 배포 페이지
링크: https://humanscape-team5a.netlify.app/

## 실행 화면과 기능
### 메인 화면

![큰화면검색구현](https://user-images.githubusercontent.com/88325253/169681357-ee18dcbc-9db5-4161-b689-272ab7c5dbf9.gif)

* 검색창을 열면 바로 데이터가 로딩됩니다. 검색어를 입력하지 않더라도 `로딩 중...` 이라는 메세지를 통해 데이터를 불러오고 있다는 것을 알 수 있습니다. 데이터를 다 불러올 때까지 검색어를 입력하지 않으면 드롭다운 메뉴가 닫힙니다.
* 검색창에 텍스트를 입력하면 `해당 문자열을 포함한 추천 검색어(최대 7개)` 가 나타납니다. 키워드와 일치하는 부분은 파란색으로 강조되어 나타납니다.
* `퍼지 문자열 검색어`를 지원하여, 문자열을 구성하는 글자들이 서로 떨어져 있는 검색어도 추천합니다. 퍼지 문자열의 최대 거리가 가까울수록 사용자가 원하는 검색어일 확률이 높다고 생각하여, 최대 거리를 기준으로 내림차순 정렬하여 제시합니다.
* 초성 검색을 지원하고, 종성이 있는 경우는 종성까지 정확히 입력해야 합니다.

![큰화면키보드이동](https://user-images.githubusercontent.com/88325253/169682239-fbff4eea-d71d-4e47-9884-a6cba9c27d33.gif)

* 위/아래 키보드를 누르거나 마우스를 이용해 원하는 추천 검색어로 이동할 수 있습니다. 마우스가 특정 추천 검색어를 가리키는 상태에서 위/아래 키보드를 누르면, 마우스가 가리키던 위치에서 시작하여 움직입니다.
* 키워드를 입력한 상태에서 엔터나 검색 버튼을 누르면 키워드 그대로 검색이 됩니다. 추천 검색어 중 하나를 선택하면 [한국임상정보](https://clinicaltrialskorea.com/)에서 해당 검색어로 검색한 화면이 나타납니다.

---

### 모바일 화면

![데이터로딩중양쪽](https://user-images.githubusercontent.com/88325253/169682508-87ac02e8-16e5-4639-aeab-db2bccb41555.gif)
* 검색창을 열면 바로 데이터가 로딩됩니다. 검색어를 입력하지 않더라도 `로딩 중...` 이라는 메세지를 통해 데이터를 불러오고 있다는 것을 알 수 있습니다.
* 로딩이 완료되면 `로딩 중...` 글이 사라지고, 검색창에 텍스트를 입력하면 해당 문자열을 포함한 `추천 검색어(최대 7개)` 가 나타납니다. 키워드와 일치하는 부분은 파란색으로 강조되어 나타납니다.

![검색결과없음](https://user-images.githubusercontent.com/64529155/169680754-29b0c980-52f4-4186-9bc2-42501874758e.gif)
* 검색창에 입력한 단어가 없을 시에는 `검색어 없음` 이라는 메시지가 출력됩니다.

![fuzzy](https://user-images.githubusercontent.com/88325253/169681182-cb5140d0-eeef-4ea5-b2d9-5d2255f9cd92.gif)
* `퍼지 문자열 검색어`를 지원하여, 문자열을 구성하는 글자들이 서로 떨어져 있는 검색어도 추천합니다. 퍼지 문자열의 최대 거리가 가까울수록 사용자가 원하는 검색어일 확률이 높다고 생각하여, 최대 거리를 기준으로 내림차순 정렬하여 제시합니다.
* `초성 검색` 을 지원하고, 종성이 있는 경우는 종성까지 정확히 입력해야 합니다.

![키보드링크이동2](https://user-images.githubusercontent.com/64529155/169680764-4ae5ab4e-dc78-48a5-a7ed-42666acd2ecb.gif)
* 위/아래 키보드를 누르거나 마우스를 이용해 원하는 추천 검색어로 이동할 수 있습니다. 마우스가 특정 추천 검색어를 가리키는 상태에서 위/아래 키보드를 누르면, 마우스가 가리키던 위치에서 시작하여 움직입니다.
* 키워드를 입력한 상태에서 엔터나 검색 버튼을 누르면 키워드 그대로 검색이 됩니다. 추천 검색어 중 하나를 선택하면 [한국임상정보](https://clinicaltrialskorea.com/)에서 해당 검색어로 검색한 화면이 나타납니다.

![화면나갔을때값](https://user-images.githubusercontent.com/64529155/169680767-9b15da66-6a7c-48aa-aff4-ab52f468d69f.gif)
* 모바일 검색창에서 검색어를 입력한 후, 뒤로가기 버튼을 눌러도 검색어가 유지되어 있습니다.

### 반응형 화면
![반응형 검색2](https://user-images.githubusercontent.com/88325253/169682170-3b947795-4390-45ad-b463-f1f6d39700f7.gif)
* 큰 화면에서 크기를 줄이면 모바일 화면으로 바뀝니다.

---

## Directory
```tree
src/
├── index.tsx
├── assets
│   └── svgs
├── components
│   ├── MobileSearchList
│   │   ├── MobileSearchList.module.scss
│   │   └── index.tsx
│   └── SearchList
│       ├── SearchList.module.scss
│       └── index.tsx
├── hooks
│   ├── index.ts
│   ├── useAppDispatch.ts
│   ├── useAppSelector.ts
│   ├── useSearchAll.ts
│   └── useSearchKeyword.ts
├── pages
│   ├── index.tsx
│   ├── Pages.module.scss
│   ├── MobileSearchDiseases
│   │   ├── index.tsx
│   │   └── MobileSearchDiseases.module.scss
│   └── SearchDiseases
│       ├── index.tsx
│       └── SearchDiseases.module.scss
├── services
│   ├── fuzzyString.ts
│   └── search.ts
├── states
│   ├── index.ts
│   ├── allItems.ts
│   ├── apiCount.ts
│   ├── searchResultList.ts
│   └── searchValue.ts
├── styles
│   ├── base
│   │   ├── _fonts.scss
│   │   ├── _more.scss
│   │   └── _reset.scss
│   ├── constants
│   │   ├── _colors.scss
│   │   ├── _levels.scss
│   │   └── _sizes.scss
│   ├── index.js
│   ├── index.scss
│   └── mixins
│       ├── _animation.scss
│       ├── _flexbox.scss
│       └── _position.scss
└── types
    ├── react-app-env.d.ts
    └── search.d.ts
```

## 주요 기술 스택
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/>

## Dependencies
- axios
- lodash
- react-query
- redux-toolkit
- react-responsive

## 구현 상세 설명

### 전역 상태 관리

* 검색 키워드(`searchValue`): 사용자 입력하는 텍스트를 실시간으로 반영합니다.
* 검색 결과(`searchResult`): 데이터가 업데이트될 때마다 상태를 변경합니다.
* API Call 횟수(`apiCount`): API 요청이 있을 때마다 값이 하나씩 늘어납니다.

### Data Fetching

* Axios와 React Query를 활용했습니다.
* 아래와 같이 두 가지 정책을 고려했습니다.
  * 모든 데이터를 한 번에 요청해서 불러오는 방법
  * 키워드별로 개별 요청하는 방법
* 각각의 방법을 `useSearchAll`, `useSearchKeyword` 커스텀 훅으로 구현했습니다. 두 훅 모두 불러온 데이터를 fuzzy string으로 검색하고, `serachResult` 상태에 업데이트합니다.
* API 응답에 평균 5초 이상이 걸린다는 특징에 따라 `데이터를 한 번에 불러온 뒤 캐싱된 데이터를 활용하는 방법`을 선택했습니다. 첫 로딩 시간에 약간의 손해가 있었지만, 요청 및 응답 자체에 걸리는 시간을 고려할 때 최적의 방법이라 판단했습니다.
  * 현재는 데이터가 72bytes로 매우 적은 크기여서 한 번에 불러오는 것이 가장 효율적인 방법이라 생각하여 선택했습니다.
  * 데이터가 늘어날 수 있는 가능성을 고려하여 키워드 별로 api를 호출할 수 있는 `useSearchKeyword` 훅을 구현했습니다. (현재는 사용하지 않기 때문에 주석처리 했습니다.)

### CORS(Cross-origin resource sharing) 문제 해결

* CORS 문제를 해결해주기 위해서 [서버](https://github.com/restareaByWeezy/humanscape-server) 를 만들었고,  서버에서 api콜을 받아 다시 프론트엔드쪽으로 보내주는 방법을 선택했습니다.
* 서버는 Node.js / express를 이용하여 만들었고, vercel로 배포하였습니다.

* SOP 는 브라우저의 스펙이므로 서버쪽에서는 CORS 허용 도메인을 자유롭게 정해줄 수 있기 때문에 서버를 사용했습니다.

* 서버단에서 필요한 파라미터 값을 넣어주었고 프론트단에서 받아와야하는 파라미터 값들은 쿼리로 받아서 변수로 지정해주었습니다.

#### 어려웠던 점

어려웠던 점은 서버 코드를 짤 때 외부 폴더에서 진행했기 때문에 
코드가 옳게 작성된 것인지 즉각적인 확인이 어려웠습니다.


### 반응형 웹 구현

#### 필요 조건들

* 1040px을 기점으로 화면 전환.
  * react-responsive 라이브러리를 이용하여 화면 크기를 판별하고, 크기 별로 조건을 걸어 조건에 따라 화면에 출력되는 컴포넌트를 달리 했습니다.

* 메인 화면, 모바일 화면 간 input 입력 값과 결과 값 공유
  * input의 입력 값은 redux로 전역에서 관리하기 때문에 공유가 되고있습니다.

* 모바일 화면에서 검색 값 입력은 별도의 화면에서 진행
  * 타입이 boolean인 state값에 따라 화면 입력 화면 출력여부를 결정하고, 검색 화면 컴포넌트 출력 시 검색 화면만 보이게끔 코드를 작성하였습니다.  

* 작은 화면 입력 값에는 초기 화면에서 검색바를 누르면 별도의 화면이 띄워지고화살표 아이콘을 누르면 별도의 화면이 없어진다.
  * 화살표 아이콘도 마찬가지로 boolean값을 변경하여 검색바 화면으로 이동되게 끔 하였습니다.

* 닫기 아이콘을 누르면 입력했던 값이 지워진다. 
  * 닫기 아이콘을 입력하면 빈 값을 넣어주게 끔 설정하였습니다.

* Redux로 관리되고 있는 검색 값을 메인 화면과 검색창 화면이 공유하고 있기 때문에 검색값을 입력하고 화면을 닫으면 검색바에 회색 글씨로 검색값이 출력됩니다. 

#### 예시 페이지와 차이점
* 제공 페이지에서는 input 입력 값을 모바일 화면과 큰 화면이 공유하고 있지 않습니다.

### Fuzzy string

- 사용자가 검색을 할 때 전부 입력하지 않고 일부만 입력해도 원하는 결과를 볼 수 있도록 `퍼지 문자열`을 사용해서 기능을 구현했습니다.
- 영어와 한글 퍼지 문자열 둘 다 글자로 검색이 가능했지만, 한글의 경우 초성 문자 그대로 검색하여 원하는 결과를 얻을 수 없었습니다. 
  - 초성, 중성, 종성을 고려해서 만들어진 정규식을 이용하면 초성 검색이 가능할 거라 생각했습니다.
  - 이 기능은 [[JS] 한글도 지원하는 퍼지 문자열 검색](https://taegon.kim/archives/9919#comments) 글을 참고하여 구현을 완료했습니다.
- 영어의 경우 정규식 플래그 `i`를 추가하여 대소문자를 구별하지 않고 검색할 수 있습니다.
- 한글의 경우 초성과 온전한 한 음절(초성+중성, 초성+중성+종성)으로 나누어 검색할 수 있습니다.
  - 온전한 한 음절은 문자 자체를 비교하면 되므로 방식이 영어와 동일합니다.
  - 초성은 해당 초성부터 초성을 포함하는 모든 음절을 비교하는 방식입니다.
    - ex) 초성 'ㄹ' 일 때, 패턴 : `[ㄹ\ub77c-\ub9c7]`  -> 'ㄹ' ~ '맇'
- 기존에는 퍼지 문자열을 통해 데이터를 선별하는 과정에서 입력한 패턴이 어떤 글자에 일치했는지 `<mark>`태그로 감싸준 후 결과값에 넣었습니다.
  - 결과값에 태그가 포함된 후 문자열로 저장되기 때문에 html 파싱을 하지 않으면 `<mark>어</mark>떤문자` 처럼 출력되는 문제가 있었습니다.
  - `innerHTML` 이나 `dangerouslySetInnerHTML`을 사용하는 것은 XSS(크로스 사이트 스크립팅)에 취약하기 때문에 사용하지 않았습니다.
  - `split`을 통해 단어를 구별하고, 구별된 단어들 중 입력한 글자일 경우`<mark>`태그로 다시 감싸서 화면에 출력되는 방법을 사용했습니다.

