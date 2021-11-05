export const isLocalStorageAvailable = (): boolean => {
  const test = 'test'
  try {
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (e) {
    return false
  }
}

export const setToLocalStorage = (
  name: string,
  value: string | boolean
): void => {
  if (isLocalStorageAvailable()) {
    localStorage.setItem(name, JSON.stringify(value))
  }
}

export const getFromLocalStorage = (
  name: string
): string | boolean | undefined | null => {
  if (isLocalStorageAvailable()) {
    const value = localStorage.getItem(name)

    if (!value) {
      return undefined
    }
    return JSON.parse(value)
  }
}
