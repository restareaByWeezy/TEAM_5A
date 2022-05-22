import { ChangeEvent, FormEvent, useState } from 'react';

// import { useSearchKeyword } from 'hooks/useSearchKeyword';
import { useSearchAll } from 'hooks/useSearchAll';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getSearchValue, setSearchValue } from 'states/searchValue';
import SearchList from 'components/SearchList';

import styles from './SearchDiseases.module.scss';
import { SearchIcon } from 'assets/svgs';
import { SEARCH_BASE_URL } from 'services/searchURL';

const SearchDiseases = () => {
  const { isLoading } = useSearchAll();
  const [index, setIndex] = useState(-1);

  // 키워드 별로 api를 호출하는 기능입니다.
  // const { isLoading } = useSearchKeyword();

  const searchValue = useAppSelector(getSearchValue);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (index === -1) {
      window.open(`${SEARCH_BASE_URL}${searchValue}`, '_self');
    }
  };

  const handleClickSubmitButton = () => {
    if (index === -1) {
      window.open(`${SEARCH_BASE_URL}${searchValue}`, '_self');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <div className={styles.searchContainer}>
      <header>
        <h2 className={styles.title}>
          국내 모든 임상시험 검색하고
          <br />
          온라인으로 참여하기
        </h2>
      </header>
      <main>
        <form className={styles.searchWrapper} onSubmit={handleSubmit}>
          <SearchIcon className={styles.icon} />
          <input
            className={styles.searchInput}
            type="text"
            placeholder="질환명을 입력해 주세요."
            onChange={handleChange}
            value={searchValue}
          />
          <button className={styles.searchButton} type="submit" onClick={handleClickSubmitButton}>
            검색
          </button>
        </form>
        {(isLoading || searchValue) && <SearchList isLoading={isLoading} index={index} setIndex={setIndex} />}
      </main>
    </div>
  );
};

export default SearchDiseases;
