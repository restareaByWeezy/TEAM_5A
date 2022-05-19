import { axios } from 'hooks/worker'
import { IDiseaseAPIRes } from 'types/search'

const SEARCH_DISEASES_BASE_URL = '/getDissNameCodeList?sickType=1&medTp=2&diseaseType=SICK_NM'

interface Params {
  searchText: string
}

export const getSearchDiseasesApi = (params: Params) =>
  axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
    params: {
      ...params,
      ServiceKey: process.env.REACT_APP_DISEASES_ID,
      _type: 'json',
    },
  })

// 전체 불러오는 call

// export const getSearchDiseasesApi = () =>
//   axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
//     params: {
//       ServiceKey: process.env.REACT_APP_DISEASES_ID,
//       _type: 'json',
//     },
//   })
