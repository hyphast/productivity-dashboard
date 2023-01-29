import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { IndicatorColorEnum } from '../components/ColoredCircle'
import avatarImg0 from '../assets/img/ava0.png'
import avatarImg1 from '../assets/img/ava.jpg'
import avatarImg2 from '../assets/img/ava2.jpg'
import avatarImg3 from '../assets/img/ava3.jpg'

export const avatars = [avatarImg0, avatarImg1, avatarImg2, avatarImg3]

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
  setUser: (id: string, name: string, avatarIdx: number) => void
  addProject: (id: string, name: string) => void
  renameProject: (id: string, name: string) => void
}

export const useUserStore = create<IUserState>()(
  devtools(
    immer(
      persist(
        (set, get) => ({
          user: {
            id: '',
            avatar: 0,
            name: '',
          },
          projects: [],
          setUser: (id: string, name: string, idx: number) =>
            set({ user: { id, name, avatar: idx } }),
          renameProject: (id: string, name: string) => {
            const projectExistId = findProjectId(get().projects, id)
            if (projectExistId > -1) {
              set((state) => {
                state.projects[projectExistId].name = name
              })
            }
          },
          addProject: (id: string, name: string) => {
            const projectExistId = findProjectId(get().projects, id)
            if (projectExistId > -1) {
              set((state) => {
                state.projects[projectExistId].name = name
              })
            } else {
              set((state) => {
                state.projects.push({
                  id,
                  name,
                  indicator: randIndicator(),
                })
              })
            }
          },
        }),
        {
          name: 'user-storage',
        }
      )
    )
  )
)
