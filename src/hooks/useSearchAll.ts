import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { useAppSelector } from 'hooks';
import { getAllDiseasesApi } from 'services/search';
import { getSearchValue } from 'states/value/searchValue';
import { incrementCount } from 'states/apiCount';
import { setSearchResultList } from 'states/searchResultList';
import FuzzyString from 'components/Fuzzystring';
import { uniqBy } from 'lodash';

export const useSearchAll = () => {
  const searchValue = useAppSelector(getSearchValue);
  const apiCount = useAppSelector((state) => state.apiCount);

  const dispatch = useDispatch();

  const { data, ...res } = useQuery(
    ['getDiseaseNameAPI', 'all'],
    () => {
      dispatch(incrementCount());
      return getAllDiseasesApi();
    },
    {
      staleTime: 2 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (apiCount.value <= 0) return;
    // eslint-disable-next-line no-console
    console.log(`API request counts: ${apiCount.value}`);
  }, [apiCount.value]);

  useEffect(() => {
    if (!data) return;
    const regex = FuzzyString(searchValue);
    const diseasesData = uniqBy(data, 'sickCd');
    const resultData = diseasesData
      .filter((row) => {
        return regex.test(row.sickNm);
      })
      .map((row) => {
        return {
          sickCd: row.sickCd,
          sickNm: row.sickNm.replace(regex, (match, ...groups) => {
            const letters = groups.slice(0, groups.length - 2);
            let lastIndex = 0;
            const highlighted = [];
            for (let i = 0, l = letters.length; i < l; i += 1) {
              const idx = match.indexOf(letters[i], lastIndex);
              highlighted.push(match.substring(lastIndex, idx));
              highlighted.push(',');
              highlighted.push(`|${letters[i]}|`);
              highlighted.push(',');
              lastIndex = idx + 1;
            }
            return highlighted.join('');
          }),
        };
      });

    dispatch(setSearchResultList(resultData.slice(0, 8)));

    // const result = searchValue ? data.filter(({ sickNm }) => sickNm.toLowerCase().includes(searchValue)) : [];
    // dispatch(setSearchResultList(result));
  }, [searchValue, data, dispatch]);

  return { data, ...res };
};
