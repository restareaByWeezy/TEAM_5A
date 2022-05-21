import { useState } from 'react';

import { useSearchAll } from 'hooks/useSearchAll';
import { useAppSelector } from 'hooks';
import { getSearchValue } from 'states/searchValue';
import styles from './MobileSearchDiseases.module.scss';
import { SearchIcon } from '../../assets/svgs/index';
import MobileSearchList from '../../components/MobileSearchList';

const MobileSearchDisease = () => {
  const { isLoading } = useSearchAll();
  const searchValue = useAppSelector(getSearchValue);

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleShowList = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.bg}>
      <div className={styles.bgCenter}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <div className={styles.title}>
              국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
            </div>
            <form className={styles.searchWrapper} onSubmit={handleSubmit}>
              <div role="presentation" className={styles.inputWrapper}>
                <button type="button" className={styles.listBtn} onClick={handleShowList}>
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
