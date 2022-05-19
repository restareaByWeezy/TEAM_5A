import { IItem } from 'types/search'
import cx from 'classnames'

import styles from './SearchList.module.scss'
import '../SearchDiseases.scss'
import { Dispatch, SetStateAction, useCallback, useEffect, useState, MouseEvent, FocusEvent } from 'react'
import { SearchIcon } from 'assets/svgs'

interface Props {
  searchList: IItem[] | undefined
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const SearchList = ({ searchList, isOpen, setIsOpen }: Props) => {
  const [index, setIndex] = useState<number>(-1)

  const handleKeyPress = (event: { key: string }) => {
    if (!searchList) return
    if (event.key === 'ArrowDown') {
      isOpen && setIndex((prev) => (prev < searchList.length - 1 ? prev + 1 : 0))
    }
    if (event.key === 'ArrowUp') {
      isOpen && setIndex((prev) => (prev > 0 ? prev - 1 : searchList.length - 1))
    }
    if (event.key === 'Escape') {
      setIndex(-1)
      setIsOpen(false)
    }
  }

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress)

    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  if (!searchList) return null

  const loadSearchList =
    searchList.length !== 0 &&
    searchList.map((item, idx) => (
      <li className={cx(styles.listContent, { [styles.isFocus]: idx === index })} key={item.sickCd}>
        <SearchIcon className={styles.searchIcon} />
        <div>{item.sickNm}</div>
      </li>
    ))

  return (
    <div className={styles.list}>
      <ul>{loadSearchList}</ul>
    </div>
  )
}

export default SearchList
