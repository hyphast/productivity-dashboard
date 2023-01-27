import { RefObject, useEffect } from 'react'

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  cb: () => void
) => {
  useEffect(() => {
    const onClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        cb()
      }
    }
    document.body.addEventListener('click', onClickOutside)
    return () => document.body.removeEventListener('click', onClickOutside)
  }, [cb])
}
