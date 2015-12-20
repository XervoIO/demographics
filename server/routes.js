import Ping from './handlers/ping'
import Project from './handlers/project'
import Version from './handlers/version'

export default [
  { method: 'GET', path: '/ping', handler: Ping },

  // Projects
  { method: 'POST', path: '/projects', config: Project.create },
  { method: 'DELETE', path: '/projects/{name}', config: Project.delete },
  { method: 'GET', path: '/projects/{name}', config: Project.get },
  { method: 'GET', path: '/projects', config: Project.getAll },

  // Versions
  { method: 'POST', path: '/projects/{name}/versions', config: Version.create },
  { method: 'GET', path: '/projects/{name}/versions', config: Version.get },
  { method: 'GET', path: '/versions', config: Version.getAll }
]
