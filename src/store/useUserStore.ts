import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

interface IUserState {
  name: string
  projects: string[]
  setName: (name: string) => void
  addProject: (id: string) => void
}

export const useUserStore = create<IUserState>()(
  devtools(
    immer((set) => ({
      name: 'Пользователь',
      projects: [],
      setName: (name: string) => set(() => ({ name })),
      addProject: (id: string) =>
        set((state) => {
          state.projects.push(id)
        }),
    }))
  )
)
