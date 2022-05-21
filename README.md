# 검색어 추천이 있는 검색창 만들기

## 목차

## Overview
원티드 프리온보딩 코스 5-A조 휴먼스케이프 과제 프로젝트입니다. <br />
[한국임상정보](https://clinicaltrialskorea.com/)의 검색창을 클론 코딩하였고, [공공데이터포털 오픈 API](https://www.data.go.kr/data/15001675/openapi.do)의 데이터를 활용했습니다.

## 실행 화면

## 배포 페이지

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

## 전역 상태 관리
* 검색 키워드(`searchValue`): 사용자 입력하는 텍스트를 실시간으로 반영합니다.
* 검색 결과(`searchResult`): 데이터가 업데이트될 때마다 상태를 변경합니다.
* API Call 횟수(`apiCount`): API 요청이 있을 때마다 값이 하나씩 늘어납니다.

## Data Fetching
* Axios와 React Query를 활용했습니다.
* 아래와 같이 두 가지 정책을 고려했습니다.
  * 모든 데이터를 한 번에 요청해서 불러오는 방법
  * 키워드별로 개별 요청하는 방법
* 각각의 방법을 `useSearchAll`, `useSearchKeyword` 커스텀 훅으로 구현했습니다. 두 훅 모두 불러온 데이터를 fuzzy string으로 검색하고, `serachResult` 상태에 업데이트합니다.
* API 응답에 평균 5초 이상이 걸린다는 특징에 따라 데이터를 한 번에 불러온 뒤 캐싱된 데이터를 활용하는 방법을 선택했습니다. 첫 로딩 시간에 약간의 손해가 있었지만, 요청 및 응답 자체에 걸리는 시간을 고려할 때 최적의 방법이라 판단했습니다.
