import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { produce } from 'immer'
import { IndicatorColorEnum } from '@/components/colored-circle'
import avatar0 from '@/assets/images/avatars/ava0.png'
import avatar2 from '@/assets/images/avatars/ava2.jpg'
import avatar1 from '@/assets/images/avatars/ava1.jpg'
import avatar3 from '@/assets/images/avatars/ava3.jpg'
import avatar4 from '@/assets/images/avatars/ava4.png'
import avatar5 from '@/assets/images/avatars/ava5.png'
import avatar6 from '@/assets/images/avatars/ava6.png'
import avatar7 from '@/assets/images/avatars/ava7.png'
import avatar8 from '@/assets/images/avatars/ava8.png'
import avatar9 from '@/assets/images/avatars/ava9.png'
import avatar10 from '@/assets/images/avatars/ava10.png'

export const avatars = [
  avatar0,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
]

function randIndicator() {
  const enumValues = Object.values(IndicatorColorEnum)
  const index = Math.floor(Math.random() * enumValues.length)

  return enumValues[index]
}

function findProjectId(projects: Project[], id: string) {
  return projects.findIndex((item) => item.id === id)
}

type Project = {
  id: string
  indicator: IndicatorColorEnum
  name: string
}
interface IUserState {
  user: { id: string; avatar: number; name: string }
  projects: Project[]
  search: string
  setSearch: (search: string) => void
  setUser: (id: string, name: string, avatarIdx: number) => void
  addProject: (id: string, name: string) => void
  deleteProject: (id: string) => void
  renameProject: (id: string, name: string) => void
}

export const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: {
          id: '',
          avatar: 0,
          name: '',
        },
        projects: [],
        search: '',
        setUser: (id: string, name: string, idx: number) =>
          set({ user: { id, name, avatar: idx } }),
        setSearch: (search: string) => set({ search }),
        renameProject: (id: string, name: string) => {
          const projectExistId = findProjectId(get().projects, id)

          if (projectExistId > -1) {
            set(
              produce<IUserState>((state) => {
                state.projects[projectExistId].name = name
              })
            )
          }
        },
        addProject: (id: string, name: string) => {
          const projectExistId = findProjectId(get().projects, id)
          if (projectExistId > -1) {
            set(
              produce<IUserState>((state) => {
                state.projects[projectExistId].name = name
              })
            )
          } else {
            set(
              produce<IUserState>((state) => {
                state.projects.push({
                  id,
                  name,
                  indicator: randIndicator(),
                })
              })
            )
          }
        },
        deleteProject: (id: string) =>
          set((state) => ({
            projects: state.projects.filter((item: Project) => item.id !== id),
          })),
      }),
      {
        name: 'user-storage',
      }
    )
  )
)
