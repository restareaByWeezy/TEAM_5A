import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { debounce } from 'lodash'

import { useSearchAll } from 'hooks/useSearchAll'
// import { getSearchDiseasesApi } from 'services/search'

import './SearchDiseases.scss'
import SearchList from 'components/SearchList'
import FuzzyString from 'components/SearchList/Fuzzystring'

const SearchDiseases = () => {
  const [inputValue, setInputValue] = useState('')
  const { searchKey, setSearchKey, searchResult, isLoading } = useSearchAll()

  useEffect(() => {
    console.log(searchKey)
  })

  // useMemo(() => {
  //   if (!inputValue) return
  //   const regex = FuzzyString(inputValue)
  //   const resultData = testData
  //     .filter((row) => {
  //       return regex.test(row.name)
  //     })
  //     .map((row) => {
  //       return row.name.replace(regex, (match, ...groups) => {
  //         const letters = groups.slice(0, groups.length - 2)
  //         let lastIndex = 0
  //         const highlighted = []
  //         for (let i = 0, l = letters.length; i < l; i += 1) {
  //           const idx = match.indexOf(letters[i], lastIndex)
  //           highlighted.push(match.substring(lastIndex, idx))
  //           highlighted.push(`<mark>${letters[i]}</mark>`)
  //           lastIndex = idx + 1
  //         }
  //         console.log(highlighted)
  //         return highlighted.join('')
  //       })
  //     })
  //   // console.log(resultData)
  //   setIsOpen(true)
  //   setTestList(resultData)
  // }, [inputValue])

  // TODO
  // let timeoutId: NodeJS.Timeout

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setInputValue(value)
    setSearchKey(value)

    // if (timeoutId) clearTimeout(timeoutId)
    // timeoutId = setTimeout(() => setSearchKey(value), 500)
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
            {(isLoading || searchKey) && (
              <SearchList searchList={searchResult} setSearchKey={setSearchKey} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchDiseases
