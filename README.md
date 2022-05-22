# 검색어 추천이 있는 검색창 만들기

## 목차
* [Overview](https://github.com/preOnboarding-5-team/TEAM_5A#overview)
* [실행 화면 및 기능](https://github.com/preOnboarding-5-team/TEAM_5A#실행-화면-및-기능)
* [Directory](https://github.com/preOnboarding-5-team/TEAM_5A#directory)
* [주요 기술 스택](https://github.com/preOnboarding-5-team/TEAM_5A#주요-기술-스택)]
* [구현 상세 설명](https://github.com/preOnboarding-5-team/TEAM_5A#구현-상세-설명)
  * [전역 상태 관리](https://github.com/preOnboarding-5-team/TEAM_5A#전역-상태-관리)
  * [Data Fetching](https://github.com/preOnboarding-5-team/TEAM_5A#data-fetching)
* [Contributors](https://github.com/preOnboarding-5-team/TEAM_5A#contributors)

## Overview
원티드 프리온보딩 코스 5-A조 휴먼스케이프 과제 프로젝트입니다. <br />
[한국임상정보](https://clinicaltrialskorea.com/)의 검색창을 클론 코딩하였고, [공공데이터포털 오픈 API](https://www.data.go.kr/data/15001675/openapi.do)의 데이터를 활용했습니다.

## 배포 페이지

## 실행 화면과 기능
* 검색창을 열면 바로 데이터가 로딩됩니다. 검색어를 입력하지 않더라도 '로딩 중...'이라는 메세지를 통해 데이터를 불러오고 있다는 것을 알 수 있습니다. 데이터를 다 불러올 때까지 검색어를 입력하지 않으면 드롭다운 메뉴가 닫힙니다.
* 검색창에 텍스트를 입력하면 해당 문자열을 포함한 추천 검색어(최대 8개)가 나타납니다. 키워드와 일치하는 부분은 노란색으로 강조되어 나타납니다.
* 퍼지 문자열 검색어를 지원하여, 문자열을 구성하는 글자들이 서로 떨어져 있는 검색어도 추천합니다. 퍼지 문자열의 최대 거리가 가까울수록 사용자가 원하는 검색어일 확률이 높다고 생각하여, 최대 거리를 기준으로 내림차순 정렬하여 제시합니다.
* 초성 검색을 지원하고, 종성이 있는 경우는 종성까지 정확히 입력해야 합니다.
* 위/아래 키보드를 누르거나 마우스를 이용해 원하는 추천 검색어로 이동할 수 있습니다. 마우스가 특정 추천 검색어를 가리키는 상태에서 위/아래 키보드를 누르면, 마우스가 가리키던 위치에서 시작하여 움직입니다.
* 키워드를 입력한 상태에서 엔터나 검색 버튼을 누르면 키워드 그대로 검색이 됩니다. 추천 검색어 중 하나를 선택하면 [한국임상정보](https://clinicaltrialskorea.com/)에서 해당 검색어로 검색한 화면이 나타납니다.

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
* Typescript
* React
* Redux
* React Query

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
* API 응답에 평균 5초 이상이 걸린다는 특징에 따라 데이터를 한 번에 불러온 뒤 캐싱된 데이터를 활용하는 방법을 선택했습니다. 첫 로딩 시간에 약간의 손해가 있었지만, 요청 및 응답 자체에 걸리는 시간을 고려할 때 최적의 방법이라 판단했습니다.
