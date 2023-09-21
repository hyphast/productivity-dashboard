import { useCallback, useState } from 'react'

type UseModalReturn = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleClose: () => void
}

export const useModal = (initialOpen: boolean = false): UseModalReturn => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, setIsOpen, handleClose }
}
