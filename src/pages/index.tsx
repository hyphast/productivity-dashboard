import { Route, Routes } from 'react-router-dom'
import { Content } from '@/pages/content/ui'
import { ProjectNotChosen } from './project-result/project-not-chosen'
import { ProjectNotFound } from './project-result/project-not-found'
import { Main } from './main'

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route element={<ProjectNotChosen />} index />
        <Route path="/project-not-chosen" element={<ProjectNotChosen />} />
        <Route path="/project-not-found" element={<ProjectNotFound />} />
        <Route path=":id" element={<Content />} />
      </Route>
    </Routes>
  )
}
