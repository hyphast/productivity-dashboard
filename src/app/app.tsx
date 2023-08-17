import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { Main } from '@/layout/main'
import { useModal } from '@/hooks/use-modal'
import { ConditionalRender } from '@/shared/conditional-render'
import { ProjectNotChosen } from '@/shared/project-result/project-not-chosen'
import { ProjectNotFound } from '@/shared/project-result/project-not-found'
import { Modal } from '@/shared/modal'
import { NewUser } from '@/widgets/modal-forms/new-user'
import { Content } from '@/widgets/content'

import './app.scss'

export const App = () => {
  const { isOpen, handleClose } = useModal(true)
  const [isPersist, setIsPersist] = useState(false)

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  useEffect(() => {
    const storage = localStorage.getItem('user-storage')

    if (!storage) return

    if (JSON.parse(storage)?.state?.user?.name.length) {
      setIsPersist(true)
    }
  }, [])

  return (
    <>
      <ConditionalRender conditions={[isTabletOrMobile]}>
        <h2 className="not-supported">Не поддерживается на мобильных устройствах</h2>
      </ConditionalRender>
      <ConditionalRender conditions={[!isTabletOrMobile]}>
        <div className="delimiters" />
        <div className="wrapper">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />}>
                <Route element={<ProjectNotChosen />} index />
                <Route path=":id" element={<Content />} />
                <Route path="/project-not-found" element={<ProjectNotFound />} />
              </Route>
            </Routes>
            {!isPersist && (
              <Modal isOpen={isOpen} title="Введите ваше имя">
                <NewUser handleClose={handleClose} />
              </Modal>
            )}
          </BrowserRouter>
        </div>
      </ConditionalRender>
    </>
  )
}
