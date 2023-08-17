import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { produce } from 'immer'
import { IndicatorColorEnum } from '@/shared/colored-circle'

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
  user: { id: string; name: string }
  projects: Project[]
  search: string
  setSearch: (search: string) => void
  setUser: (id: string, name: string) => void
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
          name: '',
        },
        projects: [],
        search: '',
        setUser: (id: string, name: string) => set({ user: { id, name } }),
        setSearch: (search: string) => set({ search }),
        renameProject: (id: string, name: string) => {
          const projectExistId = findProjectId(get().projects, id)

          if (projectExistId > -1) {
            set(
              produce<IUserState>((state) => {
                // eslint-disable-next-line no-param-reassign
                state.projects[projectExistId].name = name
              }),
            )
          }
        },
        addProject: (id: string, name: string) => {
          const projectExistId = findProjectId(get().projects, id)
          if (projectExistId > -1) {
            set(
              produce<IUserState>((state) => {
                // eslint-disable-next-line no-param-reassign
                state.projects[projectExistId].name = name
              }),
            )
          } else {
            set(
              produce<IUserState>((state) => {
                state.projects.push({
                  id,
                  name,
                  indicator: randIndicator(),
                })
              }),
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
      },
    ),
  ),
)
