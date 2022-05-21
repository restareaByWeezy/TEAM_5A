import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import cx from 'classnames';

import { BackIcon, CloseIcon, SearchIcon } from 'assets/svgs';

import { useAppSelector, useAppDispatch } from 'hooks';
import { getSearchValue, setSearchValue } from 'states/value/searchValue';

import styles from './MobileSearchList.module.scss';

interface Props {
  isLoading: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileSearchList = ({ isLoading, setIsOpen }: Props) => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(getSearchValue);
  const searchResult = useAppSelector((state) => state.searchResultList);
  const [index, setIndex] = useState(-1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };
  const handleErase = () => {
    dispatch(setSearchValue(''));
  };
  const handleShowList = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLLIElement>) => {
    if (!e.currentTarget?.dataset.idx) return;
    setIndex(Number(e.currentTarget.dataset.idx));
  };

  const handleKeyPress = (e: { key: string }) => {
    if (!searchResult.items.length) return;

    switch (e.key) {
      case 'ArrowDown':
        setIndex((prev) => (prev < searchResult.items.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        setIndex((prev) => (prev > 0 ? prev - 1 : searchResult.items.length - 1));
        break;
      case 'Escape':
        dispatch(setSearchValue(''));
        setIndex(-1);
        break;
    }
  };

  useEffect(() => {
    setIndex(-1);
  }, [searchResult]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const title = searchResult.items.length === 0 || isLoading ? '' : '추천 검색어';

  const loaderAndResult = isLoading ? (
    <p className={styles.title}>데이터 로딩 중...</p>
  ) : (
    searchResult.items.length === 0 && <p className={styles.title}>검색 결과가 없습니다.</p>
  );

  const loadSearchList = searchResult.items.map((item, idx) => (
    <li
      className={cx(styles.listContent, { [styles.isFocus]: idx === index })}
      key={item.sickCd}
      data-idx={idx}
      onMouseEnter={handleMouseEnter}
    >
      <SearchIcon className={styles.icon} />
      <a className={styles.recommended} href={`https://clinicaltrialskorea.com/studies?condition=${item.originSickNm}`}>
        {item.sickNm.split(',').map((letter, i) => {
          const key = `${item.sickCd}-${i}`;
          return letter[0] === '|' ? <mark key={key}>{letter.split('|')[1]}</mark> : letter;
        })}
      </a>
    </li>
  ));

  return (
    <div className={styles.list}>
      <p className={styles.title}>{title}</p>
      <div className={styles.listContainer}>
        <form className={styles.searchForm}>
          <button type="button" className={styles.backIcon} onClick={handleShowList}>
            <BackIcon />
          </button>
          <input
            className={styles.mobileInput}
            type="text"
            placeholder="질환명을 입력해 주세요."
            onChange={handleChange}
            value={searchValue}
          />
          <button type="button" className={styles.closeIcon} onClick={handleErase}>
            <CloseIcon />
          </button>
          <a className={styles.searchIcon} href={`https://clinicaltrialskorea.com/studies?condition=${searchValue}`}>
            <SearchIcon />
          </a>
        </form>
        {loaderAndResult}
        {searchValue && <ul className={styles.mobilelistContainer}>{loadSearchList}</ul>}
      </div>
    </div>
  );
};

export default MobileSearchList;
