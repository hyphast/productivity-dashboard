import React, { FC, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { Main } from './layout/Main'
import { useModal } from './hooks/useModal'
import {
  Content,
  Modal,
  NewUser,
  ProjectNotChosen,
  ProjectNotFound,
} from './components'
import './App.scss'

const App: FC = () => {
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

  if (isTabletOrMobile) {
    return (
      <h2 className="notSupported">
        Не поддерживается на мобильных устройствах
      </h2>
    )
  }

  return (
    <>
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
    </>
  )
}

export default App
