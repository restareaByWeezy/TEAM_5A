import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { debounce } from 'lodash'

import { useSearchAll } from 'hooks/useSearchAll'
// import { getSearchDiseasesApi } from 'services/search'

import './SearchDiseases.scss'
import SearchList from 'components/SearchList'

const SearchDiseases = () => {
  const [inputValue, setInputValue] = useState('')
  const { searchKey, setSearchKey, searchResult, isLoading } = useSearchAll()

  useEffect(() => {
    console.log(searchKey)
  })

  // let timeoutId: NodeJS.Timeout

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget

    setInputValue(value)
    setSearchKey(value)

    // if (timeoutId) clearTimeout(timeoutId)
    // timeoutId = setTimeout(() => setSearchKey(value), 100)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  // const debouncedChangeHandler = useMemo(() => debounce(handleChange, 1000), [])

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
                <input type='text' placeholder='질환명을 입력해 주세요.' onChange={handleChange} value={inputValue} />
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
