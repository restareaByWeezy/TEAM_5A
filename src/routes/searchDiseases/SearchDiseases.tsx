import { ChangeEvent, FormEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isRender, isShow } from 'states/condition/searchListRender';
import { getSearchValue, setSearchValue } from 'states/value/searchValue';
import { useQuery } from 'react-query';
import { getSearchDiseasesAPI } from 'services/search';

import { debounce } from 'lodash';

import SearchList from './SearchList/SearchList';
import styles from './searchDiseases.module.scss';

const SearchDiseases = () => {
  const dispatch = useDispatch();
  const searchValueState = useSelector(getSearchValue);
  const isSearchList = useSelector(isRender);

  const { data } = useQuery(
    ['getDiseaseNameAPI', searchValueState],
    () =>
      getSearchDiseasesAPI({ searchText: searchValueState }).then((res) => {
        const resBody = res.data.response.body;
        // eslint-disable-next-line no-console
        console.count('API CALl');
        if (resBody.totalCount > 0) dispatch(isShow());
        return resBody;
      }),
    {
      enabled: !!searchValueState,
      staleTime: 2 * 60 * 1000,
    }
  );
  const searchList = data?.items.item;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setSearchValue(value));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 1000), []);

  // const aalist = ['안구<mark>암</mark>', '안구<mark>암</mark>', '안구<mark>암</mark>', '안구<mark>암</mark>'];
  // console.log(aalist.toString().replace(/"/g, ''));
  // const ablist = [...aalist];
  // const aclist = [...aalist];
  // const test = aclist.map((item) => {});

  // const listTest = ablist.map((item, idx) => {
  //   const key = `test-${idx}`;
  //   const test = item.toString().replace(/"/g, '');

  //   return <li key={key}>{test}</li>;
  // });
  // console.log(listTest);

  return (
    <div className={styles.bg}>
      <div className={styles.bgCenter}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <h1>
              <p>국내 모든 임상시험 검색하고</p> 온라인으로 참여하기
              {/* {listTest} */}
            </h1>
            <form className={styles.searchWrapper} onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.searchInput}
                  type='text'
                  placeholder='질환명을 입력해 주세요.'
                  onChange={debouncedChangeHandler}
                />
              </div>
              <button className={styles.searchTextbox} type='submit'>
                검색
              </button>
            </form>
            {isSearchList && <SearchList searchList={searchList} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDiseases;
