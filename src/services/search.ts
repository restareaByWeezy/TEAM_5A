import { axios } from 'hooks/worker';

const SEARCH_DISEASES_BASE_URL = '/getDissNameCodeList?sickType=1&medTp=2&diseaseType=SICK_NM';

interface Params {
  searchText: string;
}

export const getSearchDiseasesAPI = async (params: Params) => {
  const { data } = await axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
    params: {
      ...params,
      ServiceKey: process.env.REACT_APP_DISEASES_ID,
      _type: 'json',
    },
  });

  return data.response.body?.items?.item;
};

export const getAllDiseasesApi = async () => {
  const { data } = await axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
    params: {
      _type: 'json',
      serviceKey: process.env.REACT_APP_DISEASES_ID,
      numOfRows: 2000,
    },
  });

  return data.response.body?.items?.item;
};
