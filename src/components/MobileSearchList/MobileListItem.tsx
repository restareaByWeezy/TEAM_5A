import React from 'react';

import { useAppSelector } from 'hooks';
import { cx } from 'styles';

const MobileListItem = () => {
  const searchResult = useAppSelector((state) => state.searchResultList);

  const handleMouseEnter = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!e.currentTarget?.dataset.idx) return;
    setIndex(Number(e.currentTarget.dataset.idx));
  };

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
};

export default MobileListItem;
