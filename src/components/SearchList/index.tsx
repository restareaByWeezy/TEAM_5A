import { MouseEvent, useEffect, Dispatch, SetStateAction } from 'react';
import cx from 'classnames';

import { useAppSelector, useAppDispatch } from 'hooks';
import { setSearchValue } from 'states/searchValue';
import { SearchIcon } from 'assets/svgs';
import { SEARCH_BASE_URL } from 'services/searchURL';

import styles from './SearchList.module.scss';

interface Props {
  isLoading: boolean;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
}

const SearchList = ({ isLoading, index, setIndex }: Props) => {
  const searchResult = useAppSelector((state) => state.searchResultList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIndex(-1);
  }, [searchResult, setIndex]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!searchResult.items.length || e.isComposing) return;

    switch (e.key) {
      case 'Enter':
        if (index >= 0) {
          window.open(`${SEARCH_BASE_URL}${searchResult.items[index].originSickNm}`, '_self');
        }
        break;
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

  const handleMouseEnter = (e: MouseEvent<HTMLLIElement>) => {
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

  const loaderAndResult = isLoading ? (
    <p className={styles.title}>데이터 로딩 중...</p>
  ) : (
    searchResult.items.length === 0 && <p className={styles.title}>검색 결과가 없습니다.</p>
  );

  const loadSearchList = searchResult.items.map((item, idx) => {
    return (
      <li
        className={cx(styles.listContent, { [styles.isFocus]: idx === index })}
        key={item.sickCd}
        data-idx={idx}
        onMouseEnter={handleMouseEnter}
      >
        <SearchIcon className={styles.icon} />
        <a className={styles.recommended} href={SEARCH_BASE_URL + item.originSickNm}>
          {item.sickNm.split(',').map((letter, i) => {
            const key = `${item.sickCd}-${i}`;
            return letter[0] === '|' ? <mark key={key}>{letter.split('|')[1]}</mark> : letter;
          })}
        </a>
      </li>
    );
  });

  return (
    <div className={styles.list}>
      <p className={styles.title}>{title}</p>
      {loaderAndResult}
      <ul className={styles.listContainer}>{loadSearchList}</ul>
    </div>
  );
};

export default SearchList;
