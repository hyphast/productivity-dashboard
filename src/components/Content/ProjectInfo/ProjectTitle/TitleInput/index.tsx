import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { useClickOutside } from '../../../../../hooks/useClickOutside'
import styles from '../ProjectTitle.module.scss'

type TitleInputProps = {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  value: string
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>
  setNewProjectName: () => void
}
export const TitleInput: FC<TitleInputProps> = ({
  onChange,
  value,
  setIsEditable,
  setNewProjectName,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const closeTitleInput = useCallback(() => {
    setNewProjectName()
    setIsEditable(false)
  }, [setNewProjectName])

  useClickOutside(inputRef, closeTitleInput)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setNewProjectName()
        setIsEditable(false)
      }
    },
    [setNewProjectName]
  )

  return (
    <input
      ref={inputRef}
      className={styles.titleInput}
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onInputKeyDown}
    />
  )
}
