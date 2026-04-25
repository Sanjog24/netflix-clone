import { useEffect, useState } from 'react'
import { ListContext } from './listContextObject'
const STORAGE_KEY = 'netflix-clone-my-list'

function getInitialList() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)
    const parsedValue = JSON.parse(storedValue ?? '[]')
    return Array.isArray(parsedValue) ? parsedValue : []
  } catch {
    return []
  }
}

export function ListProvider({ children }) {
  const [myListIds, setMyListIds] = useState(getInitialList)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(myListIds))
  }, [myListIds])

  const toggleMyList = (titleId) => {
    setMyListIds((currentList) =>
      currentList.includes(titleId)
        ? currentList.filter((id) => id !== titleId)
        : [...currentList, titleId],
    )
  }

  const isInMyList = (titleId) => myListIds.includes(titleId)

  return (
    <ListContext.Provider value={{ myListIds, toggleMyList, isInMyList }}>
      {children}
    </ListContext.Provider>
  )
}