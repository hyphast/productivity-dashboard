import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react'

import { useClickOutside } from '@/shared/lib/hooks/use-click-outside'

import styles from '../project-title/project-title.module.scss'

type TitleInputProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  setIsEditable: (value: boolean) => void
  setNewProjectName: () => void
}

export const TitleInput = ({ value, onChange, setIsEditable, setNewProjectName }: TitleInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const closeTitleInput = useCallback(() => {
    setNewProjectName()
    setIsEditable(false)
  }, [setNewProjectName])

  useClickOutside(inputRef, closeTitleInput)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setNewProjectName()
      setIsEditable(false)
    }
  }

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
