import { useMemo } from 'react';
import { debounce } from 'lodash';

import { useSearchKeyword } from 'hooks/useSearchKeyword';
import { useSearchAll } from 'hooks/useSearchAll';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getSearchValue, setSearchValue } from 'states/value/searchValue';
import SearchList from 'components/SearchList';

import styles from './MobileSearchDiseases.module.scss';
import { SearchIcon } from '../assets/svgs/index';
import MobileSearchList from './MobileSearchList';

const MobileSearchDisease = () => {
  const { isLoading } = useSearchAll();

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
    <div className={styles.bg}>
      <div className={styles.bgCenter}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <div className={styles.title}>
              국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
            </div>
            <form className={styles.searchWrapper} onSubmit={handleSubmit}>
              <div className={styles.inputWrapper}>
                <input
                  className={styles.input}
                  type='text'
                  placeholder='질환명을 입력해 주세요.'
                  onChange={debouncedChangeHandler}
                />
                <SearchIcon className={styles.searchIcon} />
              </div>
            </form>
            {(isLoading || searchValue) && <MobileSearchList isLoading={isLoading} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchDisease;
