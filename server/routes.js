import Ping from './handlers/ping'
import Project from './handlers/project'

export default [
  { method: 'GET', path: '/ping', handler: Ping },

  // Projects
  { method: 'POST', path: '/projects', config: Project.create },
  { method: 'GET', path: '/projects', config: Project.getAll }
]
