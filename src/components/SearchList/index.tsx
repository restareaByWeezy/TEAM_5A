import cx from 'classnames';
import { useEffect, useState } from 'react';

import styles from './SearchList.module.scss';
import { SearchIcon } from 'assets/svgs';

interface Props {
  searchList: IItem[];
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const SearchList = ({ searchList, setSearchKey, isLoading }: Props) => {
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    setIndex(-1);
  }, [searchList]);

  const handleKeyPress = (event: { key: string }) => {
    if (!searchList) return;
    if (event.key === 'ArrowDown') {
      setIndex((prev) => (prev < searchList.length - 1 ? prev + 1 : 0));
    }
    if (event.key === 'ArrowUp') {
      setIndex((prev) => (prev > 0 ? prev - 1 : searchList.length - 1));
    }
    if (event.key === 'Escape') {
      setIndex(-1);
      setSearchKey('');
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

  const title = searchList.length === 0 || isLoading ? '' : '추천 검색어';
  const loadSearchList = (() => {
    if (isLoading) return <p className={styles.title}>데이터 로딩 중</p>;
    if (searchList.length === 0) return <p className={styles.title}>검색 결과가 없습니다.</p>;
    return (
      <ul>
        {searchList.map((item, idx) => (
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
