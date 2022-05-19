import { useState, useEffect, useReducer } from 'react'
import { useQuery } from 'react-query'
import { getAllDiseasesApi } from 'services/search'

import type { IItem } from 'types/search'

export const useSearchAll = () => {
  const [count, increaseCount] = useReducer((prev) => prev + 1, 0)
  const [searchKey, setSearchKey] = useState('')
  const [searchResult, setSearchResult] = useState<IItem[]>([])
  const { data, ...res } = useQuery(['getDiseases', 'all'], () => getAllDiseasesApi(), {
    staleTime: 2 * 60 * 1000,
  })

  useEffect(() => {
    console.log(`API request counts: ${count + 1}`)
    increaseCount()
  }, [data])

  useEffect(() => {
    if (data === undefined) return
    setSearchResult(data.filter(({ sickNm }) => sickNm.toLowerCase().includes(searchKey)))
  }, [searchKey, data])

  return { searchKey, setSearchKey, searchResult, ...res }
}
