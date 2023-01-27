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
  setNewProject: () => void
}
export const TitleInput: FC<TitleInputProps> = ({
  onChange,
  value,
  setIsEditable,
  setNewProject,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const closeTitleInput = useCallback(() => {
    setNewProject()
    setIsEditable(false)
  }, [setNewProject])

  useClickOutside(inputRef, closeTitleInput)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setNewProject()
        setIsEditable(false)
      }
    },
    [setNewProject]
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
