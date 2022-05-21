import { useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { useSearchAll } from 'hooks/useSearchAll';
import { useAppSelector, useAppDispatch } from 'hooks';
import { getSearchValue, setSearchValue } from 'states/value/searchValue';
import styles from './MobileSearchDiseases.module.scss';
import { SearchIcon } from '../assets/svgs/index';
import MobileSearchList from './MobileSearchList';

const MobileSearchDisease = () => {
  const { isLoading } = useSearchAll();
  const searchValue = useAppSelector(getSearchValue);
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleShowList = () => {
    setIsOpen((prev) => !prev);
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
              <div role='presentation' className={styles.inputWrapper}>
                <button type='button' className={styles.listBtn} onClick={handleShowList}>
                  {searchValue}
                </button>
                <SearchIcon className={styles.searchIcon} />
              </div>
            </form>
            {isOpen && <MobileSearchList setIsOpen={setIsOpen} isLoading={isLoading} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchDisease;
