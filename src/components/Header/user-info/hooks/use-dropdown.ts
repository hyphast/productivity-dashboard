import { MouseEvent, RefObject, useMemo, useState } from 'react'
import { useClickOutside } from '@/hooks/use-click-outside'

type UseDropdownReturn = [
  boolean,
  {
    closeDropdown: () => void
    toggleDropdown: (event: MouseEvent) => void
  },
]
export const useDropdown = (
  dropdownRef: RefObject<HTMLElement>,
): UseDropdownReturn => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)

  const handlers = useMemo(
    () => ({
      closeDropdown: () => {
        setIsDropdownVisible(false)
      },
      toggleDropdown: (event: MouseEvent) => {
        event.stopPropagation()
        setIsDropdownVisible((prev) => !prev)
      },
    }),
    [],
  )

  useClickOutside(dropdownRef, handlers.closeDropdown)

  return [isDropdownVisible, handlers]
}
