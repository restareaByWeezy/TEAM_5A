import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { debounce, uniqBy } from 'lodash'

import { getSearchDiseasesApi } from 'services/search'

import './SearchDiseases.scss'
import SearchList from '../../components/SearchList'
import FuzzyString from '../../components/Fuzzystring'

import { IItem } from 'types/search'

const SearchDiseases = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  const [stringList, setStringList] = useState<IItem[]>([])

  // const loadDieasesList = (input: string) => {
  //   if (!input) {
  //     setIsOpen(false)
  //     return
  //   }
  //   if (testdata.response.body.totalCount > 0) setIsOpen(true)
  //   const regex = FuzzyString(input)
  //   const diseasesData = uniqBy(testdata.response.body.items.item, 'sickCd')
  //   const resultData = diseasesData
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
  //             highlighted.push(`<mark>${letters[i]}</mark>`)
  //             lastIndex = idx + 1
  //           }
  //           return highlighted.join('')
  //         }),
  //       }
  //     })
  //   setStringList(resultData.slice(0, 8))
  // }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    // loadDieasesList(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const debouncedChangeHandler = useMemo(() => debounce(handleChange, 1000), [])

  return (
    <div className='bg'>
      <div className='bg-center'>
        <div className='container'>
          <div className='search-container'>
            <h1>
              <div>국내 모든 임상시험 검색하고</div> 온라인으로 참여하기
            </h1>
            <form className='search-wrapper' onSubmit={handleSubmit}>
              <div className='input-wrapper'>
                <input type='text' placeholder='질환명을 입력해 주세요.' onChange={debouncedChangeHandler} />
              </div>
              <button type='submit' className='search-textbox'>
                검색
              </button>
            </form>
            {/* {isOpen && data?.items.item && (
              <SearchList searchList={data?.items.item} isOpen={isOpen} setIsOpen={setIsOpen} />
            )} */}
            {isOpen && stringList && <SearchList searchList={stringList} isOpen={isOpen} setIsOpen={setIsOpen} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchDiseases
