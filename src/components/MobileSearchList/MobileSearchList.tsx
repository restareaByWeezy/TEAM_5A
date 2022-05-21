import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
  const [index, setIndex] = useState(-1);

  const searchValue = useAppSelector(getSearchValue);
  const dispatch = useAppDispatch();

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };
  const handleErase = () => {
    dispatch(setSearchValue(''));
  };
  const handleShowList = () => {
    setIsOpen((prev) => !prev);
  };

  const searchResult = useAppSelector((state) => state.searchResultList);

  useEffect(() => {
    setIndex(-1);
  }, [searchResult]);

  // keyboard logic

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const title = searchResult.items.length === 0 || isLoading ? '' : '추천 검색어';

  const loadSearchList = (() => {
    return (
      <div className={styles.container}>
        <form className={styles.searchWrapper}>
          <div className={styles.inputWrapper}>
            <BackIcon className={styles.backIcon} onClick={handleShowList} />
            <input
              className={styles.input}
              type="text"
              placeholder="질환명을 입력해 주세요."
              onChange={handleChange}
              value={searchValue}
            />
            <CloseIcon className={styles.closeIcon} onClick={handleErase} />
            <SearchIcon className={styles.searchIcon} />
          </div>
        </form>
        {isLoading ? (
          <p className={styles.noResult}>데이터 로딩 중...</p>
        ) : (
          searchResult.items.length === 0 && <p className={styles.noResult}>검색 결과가 없습니다.</p>
        )}
        {searchValue && (
          <ul>
            {searchResult.items.map((item, idx) => (
              <li
                className={cx(styles.listContent, { [styles.isFocus]: idx === index })}
                key={item.sickCd}
                data-idx={idx}
                onMouseEnter={handleMouseEnter}
              >
                <SearchIcon className={styles.icon} />
                <span>
                  {item.sickNm.split(',').map((letter, i) => {
                    const key = `${item.sickCd}-${i}`;
                    return letter[0] === '|' ? <mark key={key}>{letter.split('|')[1]}</mark> : letter;
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
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
