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
  { method: 'DELETE', path: '/projects/{name}/versions/{version}', config: Version.delete },
  { method: 'GET', path: '/projects/{name}/versions', config: Version.get },
  { method: 'GET', path: '/versions', config: Version.getAll },
  { method: 'GET', path: '/projects/{name}/versions/{version}', config: Version.getOne },
  { method: 'PUT', path: '/projects/{name}/versions/{version}', config: Version.update }
]
