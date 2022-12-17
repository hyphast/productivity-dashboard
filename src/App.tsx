import React, { FC } from 'react'
import { Main } from './layout/Main'
import './App.scss'
import { useUserStore } from './store/useUserStore'

const App: FC = () => {
  const name = useUserStore((state) => state.name)
  const setName = useUserStore((state) => state.setName)

  if (name === '') {
    const value = prompt('Your name?')
    // if (value) {
    //   setName(value)
    // }
  }

  return (
    <div className="delimiters">
      <div className="wrapper">
        <Main />
      </div>
    </div>
  )
}

export default App
