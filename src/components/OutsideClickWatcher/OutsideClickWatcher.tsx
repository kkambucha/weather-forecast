import React, {
  FC,
  ReactNode,
  MouseEvent,
  useEffect,
  useCallback,
  createRef,
} from 'react'

interface OutsideClickWatcherProps {
  children: ReactNode
  onClickOutside: (event: MouseEvent<HTMLElement>) => void
  className?: string
  disabled?: boolean
}

export const OutsideClickWatcher: FC<OutsideClickWatcherProps> = ({
  children,
  onClickOutside,
  className = '',
  disabled = false,
}) => {
  const rootRef = createRef<HTMLDivElement>()
  const handleClickOutside = useCallback(
    (event) => {
      if (
        !disabled &&
        rootRef.current &&
        !rootRef.current.contains(event.target)
      ) {
        onClickOutside(event)
      }
    },
    [rootRef, onClickOutside, disabled]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className={className} ref={rootRef}>
      {children}
    </div>
  )
}
