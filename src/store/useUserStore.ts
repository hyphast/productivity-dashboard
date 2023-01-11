import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import avatarImg0 from '../assets/img/ava0.png'
import avatarImg1 from '../assets/img/ava.jpg'
import avatarImg2 from '../assets/img/ava2.jpg'
import avatarImg3 from '../assets/img/ava3.jpg'

export const avatars = [avatarImg0, avatarImg1, avatarImg2, avatarImg3]

interface IUserState {
  user: { id: string; avatar: number; name: string }
  projects: string[]
  setUser: (id: string, name: string, avatarIdx: number) => void
  addProject: (id: string) => void
}

export const useUserStore = create<IUserState>()(
  devtools(
    immer(
      persist(
        (set) => ({
          user: {
            id: '',
            avatar: 0,
            name: '',
          },
          projects: [],
          setUser: (id: string, name: string, idx: number) =>
            set(() => ({ user: { id, name, avatar: idx } })),
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
