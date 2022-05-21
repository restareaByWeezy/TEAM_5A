import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import cx from 'classnames';

import { useAppSelector, useAppDispatch } from 'hooks';
import { getSearchValue, setSearchValue } from 'states/value/searchValue';
import { BackIcon, CloseIcon, SearchIcon } from 'assets/svgs';

import styles from './MobileSearchList.module.scss';
import { useSearchAll } from 'hooks/useSearchAll';
import { debounce } from 'lodash';

interface Props {
  isLoading: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileSearchList = ({ isLoading, setIsOpen }: Props) => {
  const [index, setIndex] = useState(-1);

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

  const searchResult = useAppSelector((state) => state.searchResultList);

  useEffect(() => {
    setIndex(-1);
  }, [searchResult]);

  const handleKeyPress = (event: { key: string }) => {
    if (!searchResult.items.length) return;

    switch (event.key) {
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

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!e.currentTarget?.dataset.idx) return;
    setIndex(Number(e.currentTarget.dataset.idx));
  };

  const handleShowList = () => {
    setIsOpen((prev) => !prev);
  };

  // TODO 처음 키 두 번 입력됨
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const title = searchResult.items.length === 0 || isLoading ? '' : '추천 검색어';

  const loadSearchList = (() => {
    if (isLoading) return <p className={styles.title}>데이터 로딩 중...</p>;
    // if (searchResult.items.length === 0) return <p className={styles.title}>검색 결과가 없습니다.</p>;

    return (
      <div className={styles.container}>
        <form className={styles.searchWrapper} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <BackIcon className={styles.backIcon} onClick={handleShowList} />
            <input
              className={styles.input}
              type='text'
              placeholder='질환명을 입력해 주세요.'
              onChange={debouncedChangeHandler}
            />
            <CloseIcon className={styles.closeIcon} onClick={handleShowList} />
            <SearchIcon className={styles.searchIcon} />
          </div>
        </form>
        {searchResult.items.length === 0 && <p className={styles.noResult}>검색 결과가 없습니다.</p>}
        <ul>
          {searchResult.items.map((item, idx) => (
            <li
              className={cx(styles.listContent, { [styles.isFocus]: idx === index })}
              key={item.sickCd}
              data-idx={idx}
              onMouseEnter={handleMouseEnter}
            >
              <SearchIcon className={styles.icon} />
              <span>{item.sickNm}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  })();

  return (
    <div className={styles.list}>
      <p className={styles.title}>{title}</p>
      {loadSearchList}
    </div>
  );
};

export default MobileSearchList;
