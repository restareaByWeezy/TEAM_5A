import { useMemo } from 'react';
import { debounce } from 'lodash';

// import { useSearchKeyword } from 'hooks/useSearchKeyword';
import { useSearchAll } from 'hooks/useSearchAll';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getSearchValue, setSearchValue } from 'states/value/searchValue';
import SearchList from 'components/SearchList/index';

import styles from './searchDiseases.module.scss';

const SearchDiseases = () => {
  // TODO: managed state
  // const [inputValue, setInputValue] = useState('');
  const { isLoading } = useSearchAll();
  // const { isLoading } = useSearchKeyword();

  const searchValue = useAppSelector(getSearchValue);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 1000), []);

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
          <input
            className={styles.searchInput}
            type="text"
            placeholder="질환명을 입력해 주세요."
            onChange={debouncedChangeHandler}
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
