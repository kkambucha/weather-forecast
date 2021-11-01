import { Dispatch, useCallback, useEffect, useRef, useState } from 'react'

export const useKeyboardNavigation = (
  size: number
): [number, Dispatch<number>] => {
  const [activeCursor, setActiveCursor] = useState(0)

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setActiveCursor((prev) => (prev < size ? prev + 1 : 0))
      } else if (event.key === 'ArrowUp') {
        setActiveCursor((prev) => (prev > 0 ? prev - 1 : size))
      }
    },
    [size, setActiveCursor]
  )
  // Reset when size changes
  useEffect(() => setActiveCursor(0), [size])
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)

    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [size, activeCursor, handleKeyPress])

  return [activeCursor, setActiveCursor]
}

export const useFocus = (isActive: boolean) => {
  const itemRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    isActive && itemRef && itemRef.current && itemRef.current.focus()
  }, [isActive])

  return itemRef
}
