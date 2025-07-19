import { useState, useMemo, useCallback } from 'react'

interface UsePaginationProps<T> {
  items: T[]
  itemsPerPage: number
  initialPage?: number
}

export function usePagination<T>({ items, itemsPerPage, initialPage = 1 }: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage)
  }, [items.length, itemsPerPage])

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }, [totalPages])

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, totalPages])

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }, [currentPage])

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  // Resetear a la primera página si la página actual es mayor que el total de páginas
  useMemo(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    resetToFirstPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    startIndex: (currentPage - 1) * itemsPerPage + 1,
    endIndex: Math.min(currentPage * itemsPerPage, items.length),
    totalItems: items.length
  }
} 