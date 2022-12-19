import React, { FC } from 'react'
import { Main } from './layout/Main'
import { NewUser } from './components/NewUser'
import './App.scss'

const App: FC = () => {
  return (
    <div className="delimiters">
      <div className="wrapper">
        <Main />
        <NewUser />
      </div>
    </div>
  )
}

export default App
