import React, { ChangeEvent, FC, useState } from 'react'
import { ref, set, push } from 'firebase/database'
// import { useList } from './hooks/react-firebase-hooks'
import { useList } from 'react-firebase-hooks/database'
import { db } from './firebase'
import './App.scss'

const taskListRef = ref(db, 'tasks')

const App: FC = () => {
  const [title, setTitle] = useState('')
  const [snapshots, loading, error] = useList(taskListRef)

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    set(push(taskListRef), {
      title,
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <strong>{error.toString()}</strong>}
      {loading && <span>List: Loading...</span>}
      <ul>
        {!loading &&
          snapshots &&
          snapshots.map((v) => <li key={v.key}>{v.val().title}</li>)}
      </ul>
    </div>
  )
}

export default App
