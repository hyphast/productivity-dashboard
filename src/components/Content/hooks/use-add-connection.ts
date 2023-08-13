import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  off,
  onDisconnect,
  onValue,
  push,
  ref,
  set,
  ThenableReference,
} from 'firebase/database'
import { useUserStore } from '@/store/use-user-store'
import { db } from '@/firebase'

export const useAddConnection = (error: boolean) => {
  const { id } = useParams()
  const userId = useUserStore((state) => state.user.id)

  useEffect(() => {
    if (error || !id) return
    const myConnectionsRef = ref(db, `projects/${id}/connections`)
    const connectedRef = ref(db, '.info/connected')
    let con: ThenableReference | undefined
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        con = push(myConnectionsRef)

        onDisconnect(con).remove()

        set(con, userId)
      }
    })

    return () => {
      if (con) {
        set(con, null)
      }

      off(connectedRef)
    }
  }, [id, error, userId])
}
