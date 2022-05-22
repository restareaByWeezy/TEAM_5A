import { useState } from 'react';
import { useSearchAll } from 'hooks/useSearchAll';
import { useAppSelector } from 'hooks';
import { getSearchValue } from 'states/searchValue';
import MobileSearchList from 'components/MobileSearchList';

import styles from './MobileSearchDiseases.module.scss';
import { SearchIcon } from 'assets/svgs/index';

const MobileSearchDiseases = () => {
  const { isLoading } = useSearchAll();
  const searchValue = useAppSelector(getSearchValue);

  const [isOpen, setIsOpen] = useState(false);

  const handleShowList = () => {
    setIsOpen((prev) => !prev);
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
        <div className={styles.searchWrapper}>
          <button type="button" className={styles.listBtn} onClick={handleShowList}>
            {searchValue}
            <SearchIcon className={styles.icon} />
          </button>
        </div>
        {isOpen && <MobileSearchList setIsOpen={setIsOpen} isLoading={isLoading} />}
      </main>
    </div>
  );
};

export default MobileSearchDiseases;
