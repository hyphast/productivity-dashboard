import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface UserState {
  name: string
  projects: string[]
  setName: (name: string) => void
  addProject: (id: string) => void
}

export const useUserStore = create<UserState>()(
  devtools(
    immer(
      persist(
        (set) => ({
          name: '',
          projects: [],
          setName: (name: string) => set(() => ({ name })),
          addProject: (id: string) =>
            set((state) => {
              state.projects.push(id)
            }),
        }),
        {
          name: 'user-storage',
        }
      )
    )
  )
)
