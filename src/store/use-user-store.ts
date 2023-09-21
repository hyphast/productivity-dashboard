import { StateCreator, create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { produce } from 'immer'
import { DotColors } from '@/shared/ui/colored-dot'

const randomIndicator = () => {
  const enumValues = Object.values(DotColors)
  const index = Math.floor(Math.random() * enumValues.length)

  return enumValues[index]
}

const findProjectId = (projects: Project[], id: string) => projects.findIndex((item) => item.id === id)

type Project = {
  id: string
  indicator: DotColors
  name: string
}

type UserState = {
  user: {
    id: string
    name: string
  }
  setUser: (id: string, name: string) => void
}

type ProjectState = {
  projects: Project[]
  addProject: (id: string, name: string) => void
  deleteProject: (id: string) => void
  renameProject: (id: string, name: string) => void
}

type SearchState = {
  search: string
  setSearch: (search: string) => void
}

const middlewares = <T>(state: StateCreator<T>) =>
  devtools(
    persist(state, {
      name: 'user-storage',
    }),
  )

export const useUserStore = create<UserState>()(
  middlewares((set) => ({
    user: {
      id: '',
      name: '',
    },
    setUser: (id: string, name: string) => set({ user: { id, name } }),
  })),
)

export const useProjectStore = create<ProjectState>()(
  middlewares((set, get) => ({
    projects: [],
    renameProject: (id: string, name: string) => {
      const projectExistId = findProjectId(get().projects, id)

      if (projectExistId > -1) {
        set(
          produce<ProjectState>((state) => {
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
          produce<ProjectState>((state) => {
            // eslint-disable-next-line no-param-reassign
            state.projects[projectExistId].name = name
          }),
        )
      } else {
        set(
          produce<ProjectState>((state) => {
            state.projects.push({
              id,
              name,
              indicator: randomIndicator(),
            })
          }),
        )
      }
    },
    deleteProject: (id: string) =>
      set((state) => ({
        projects: state.projects.filter((item: Project) => item.id !== id),
      })),
  })),
)

export const useSearchStore = create<SearchState>()(
  middlewares((set) => ({
    search: '',
    setSearch: (search: string) => set({ search }),
  })),
)
