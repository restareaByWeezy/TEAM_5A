import { useEffect, useState } from 'react';
import cx from 'classnames';

import { useAppSelector, useAppDispatch } from 'hooks';
import { setSearchValue } from 'states/value/searchValue';
import { SearchIcon } from 'assets/svgs';

import styles from './SearchList.module.scss';

interface Props {
  isLoading: boolean;
}

const SearchList = ({ isLoading }: Props) => {
  const [index, setIndex] = useState(-1);
  const dispatch = useAppDispatch();

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
    if (searchResult.items.length === 0) return <p className={styles.title}>검색 결과가 없습니다.</p>;
    return (
      <ul>
        {searchResult.items.map((item, idx) => (
          <li
            className={cx(styles.listContent, { [styles.isFocus]: idx === index })}
            key={item.sickCd}
            data-idx={idx}
            onMouseEnter={handleMouseEnter}
          >
            <SearchIcon className={styles.icon} />
            {/* <span>{item.sickNm}</span> */}
            <span>
              {item.sickNm.split(',').map((letter, i) => {
                const key = `${item.sickCd}-${i}`;
                return letter[0] === '|' ? <mark key={key}>{letter.split('|')[1]}</mark> : letter;
              })}
            </span>
          </li>
        ))}
      </ul>
    );
  })();

  return (
    <div className={styles.list}>
      <p className={styles.title}>{title}</p>
      {loadSearchList}
    </div>
  );
};

export default SearchList;
