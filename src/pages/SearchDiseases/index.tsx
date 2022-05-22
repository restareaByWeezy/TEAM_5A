import { ChangeEvent, FormEvent, ClickEvent } from 'react';

import { useSearchAll } from 'hooks/useSearchAll';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getSearchValue, setSearchValue } from 'states/searchValue';
import SearchList from 'components/SearchList';

import styles from './SearchDiseases.module.scss';
import { SearchIcon } from 'assets/svgs';

const SearchDiseases = () => {
  const { isLoading } = useSearchAll();

  const searchValue = useAppSelector(getSearchValue);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClickSubmitButton = (e: ClickEvent<HTMLButtonElement>) {
    
  }

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
          <button className={styles.searchButton} type="submit">
            검색
          </button>
        </form>
        {(isLoading || searchValue) && <SearchList isLoading={isLoading} />}
      </main>
    </div>
  );
};

export default SearchDiseases;
