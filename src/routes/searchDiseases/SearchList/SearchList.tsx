import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isHidden } from 'states/condition/searchListRender';

import { IItem } from 'types/search';

import cx from 'classnames';

import styles from './searchList.module.scss';

interface Props {
  searchList: IItem[] | undefined;
}

const SearchList = ({ searchList }: Props) => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState<number>(-1);

  const handleKeyPress = (event: { key: string }) => {
    if (!searchList) return;
    switch (event.key) {
      case 'ArrowDown':
        setIndex((prev) => (prev < searchList.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        setIndex((prev) => (prev > 0 ? prev - 1 : searchList.length - 1));
        break;
      case 'Escape':
        dispatch(isHidden());
        setIndex(-1);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  useEffect(() => {
    setIndex(-1);
  }, [searchList]);

  if (!searchList) return null;

  const loadSearchList =
    searchList.length !== 0 &&
    searchList.map((item, idx) => {
      return (
        <li className={cx(styles.listContent, { [styles.isFocus]: idx === index })} key={item.sickCd}>
          {item.sickNm}
          <span>{idx}</span>
        </li>
      );
    });

  return (
    <div className={styles.list}>
      <p>추천 검색어</p>
      <ul>{loadSearchList}</ul>
    </div>
  );
};

export default SearchList;
