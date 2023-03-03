import { useState } from 'react'

export const useInput = () => {
  const [value, setValue] = useState('')
  const setValueHandler = (e) => {
    setValue(e.target.value)
  }

  const removeValueHandler = () => {
    setValue('')
  }
  return [value, setValueHandler, removeValueHandler]
}
