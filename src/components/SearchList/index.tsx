import { IItem } from 'types/search'
import cx from 'classnames'

import styles from './SearchList.module.scss'
// import '../SearchDiseases.scss'
import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react'

interface Props {
  searchList: IItem[]
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const SearchList = ({ searchList, isOpen, setIsOpen }: Props) => {
  const [index, setIndex] = useState<number>(-1)
  // const [stringList, setStringList] = useState<IItem[]>([])

  const autoRef = useRef<HTMLUListElement>(null)
  // console.log(autoRef)

  const handleKeyPress = (event: { key: string }) => {
    if (!searchList) return
    if (event.key === 'ArrowDown') {
      // if (index < searchList.length - 1) window.scrollTo(0, 0)
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

  // useMemo(() => {
  //   if (!inputValue) return
  //   if (!searchList) return
  //   const regex = FuzzyString(inputValue)
  //   const resultData = searchList
  //     .filter((row) => {
  //       return regex.test(row.sickNm)
  //     })
  //     .map((row) => {
  //       return {
  //         sickCd: row.sickCd,
  //         sickNm: row.sickNm.replace(regex, (match, ...groups) => {
  //           const letters = groups.slice(0, groups.length - 2)
  //           let lastIndex = 0
  //           const highlighted = []
  //           for (let i = 0, l = letters.length; i < l; i += 1) {
  //             const idx = match.indexOf(letters[i], lastIndex)
  //             highlighted.push(match.substring(lastIndex, idx))
  //             highlighted.push(`^${letters[i]}^`)
  //             lastIndex = idx + 1
  //           }
  //           return highlighted.join('')
  //         }),
  //       }
  //     })
  //   setStringList(resultData)
  //   // console.log(resultData)
  // }, [inputValue, searchList])

  const loadSearchList =
    searchList.length !== 0 &&
    searchList.map((item, idx) => (
      <li className={cx(styles.listContent, { [styles.isFocus]: idx === index })} key={item.sickCd}>
        {/* {item.sickNm} */}
        <div dangerouslySetInnerHTML={{ __html: item.sickNm }} />
      </li>
    ))

  return (
    <div className={styles.list}>
      <p>추천 검색어</p>
      <ul className={styles.valueList} ref={autoRef}>
        {loadSearchList}
      </ul>
    </div>
  )
}

export default SearchList
