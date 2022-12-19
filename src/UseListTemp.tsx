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

// import React, { ChangeEvent, FC, useEffect, useState } from 'react'
// import {
//   getDatabase,
//   ref,
//   onValue,
//   push,
//   onDisconnect,
//   set,
//   serverTimestamp,
// } from 'firebase/database'
// // import { useList } from './hooks/react-firebase-hooks'
// import { useList } from 'react-firebase-hooks/database'
// import { db } from './firebase'
// import './App.scss'
//
// const taskListRef = ref(db, 'tasks')
//
// const App: FC = () => {
//   const [title, setTitle] = useState('')
//   const [snapshots, loading, error] = useList(taskListRef)
//
//   function handleSubmit(e: React.SyntheticEvent) {
//     e.preventDefault()
//     set(push(taskListRef), {
//       title,
//     })
//   }
//
//   useEffect(() => {
//     // Since I can connect from multiple devices or browser tabs, we store each connection instance separately
//     // any time that connectionsRef's value is null (i.e. has no children) I am offline
//     const myConnectionsRef = ref(db, 'tasks/-NJQ64dYAI_GGiR_S0Ok/connections')
//
//     const connectedRef = ref(db, '.info/connected')
//     onValue(connectedRef, (snap) => {
//       if (snap.val() === true) {
//         console.log(snap.val())
//         // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
//         const con = push(myConnectionsRef)
//
//         // When I disconnect, remove this device
//         onDisconnect(con).remove()
//
//         // Add this device to my connections list
//         // this value could contain info about the device or a timestamp too
//         set(con, '123')
//       }
//     })
//   }, [])
//
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           onChange={(e: ChangeEvent<HTMLInputElement>) =>
//             setTitle(e.target.value)
//           }
//           value={title}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       {error && <strong>{error.toString()}</strong>}
//       {loading && <span>List: Loading...</span>}
//       <ul>
//         {!loading &&
//           snapshots &&
//           snapshots.map((v) => <li key={v.key}>{v.val().title}</li>)}
//       </ul>
//     </div>
//   )
// }
//
// export default App
