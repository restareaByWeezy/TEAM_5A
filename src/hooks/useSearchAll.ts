import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from 'react-query'

import { useAppSelector } from 'hooks'
import { getAllDiseasesApi } from 'services/search'
import { setAllItems } from 'states/allItems'
import { increment } from 'states/apiCount'

import type { IItem } from 'types/search'

export const useSearchAll = () => {
  const [searchKey, setSearchKey] = useState('')
  const [searchResult, setSearchResult] = useState<IItem[]>([])
  const { data, ...res } = useQuery(
    ['getDiseases', 'all'],
    () => {
      dispatch(increment())
      return getAllDiseasesApi()
    },
    {
      staleTime: 2 * 60 * 1000,
    }
  )

  const dispatch = useDispatch()
  const allItems = useAppSelector((state) => state.allItems)
  const apiCount = useAppSelector((state) => state.apiCount)

  useEffect(() => {
    if (apiCount.value <= 0) return
    console.log(`API request counts: ${apiCount.value}`)
  }, [apiCount.value])

  useEffect(() => {
    if (!data) return
    dispatch(setAllItems(data))
  }, [data])

  useEffect(() => {
    const result = searchKey ? allItems.items.filter(({ sickNm }) => sickNm.toLowerCase().includes(searchKey)) : []
    setSearchResult(result)
  }, [searchKey, allItems])

  return { searchKey, setSearchKey, searchResult, ...res }
}
