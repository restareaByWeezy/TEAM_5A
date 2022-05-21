/* eslint-disable consistent-return */
import { axios } from 'hooks/worker';

const SEARCH_DISEASES_BASE_URL = 'https://humanscape-api-server-restareabyweezy.vercel.app/';

interface Params {
  searchText: string;
}

export const getSearchDiseasesAPI = async (params: Params) => {
  const { data } = await axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
    params: {
      ...params,
      _type: 'json',
    },
  });

  const item = data.response.body?.items?.item;
  if (item === undefined) return;
  if (item instanceof Array) return item;
  return [item];
};

export const getAllDiseasesApi = async () => {
  const { data } = await axios.get<IDiseaseAPIRes>(`${SEARCH_DISEASES_BASE_URL}`, {
    params: {
      _type: 'json',
      serviceKey: process.env.REACT_APP_DISEASES_ID,
      numOfRows: 2000,
    },
  });

  const item = data.response.body?.items?.item;
  if (item === undefined) return;
  if (item instanceof Array) return item;
  return [item];
};
