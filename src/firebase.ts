import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
}

initializeApp(firebaseConfig)

export const db = getDatabase()
export const projectsRef = ref(db, 'projects')
export const usersRef = ref(db, 'users')
