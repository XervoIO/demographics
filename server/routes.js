const Ping = require('./handlers/ping')
const Project = require('./handlers/project')
const Version = require('./handlers/version')

module.exports = [
  { method: 'GET', path: '/ping', handler: Ping },

  // Projects
  { method: 'POST', path: '/projects', config: Project.create },
  { method: 'DELETE', path: '/projects/{name}', config: Project.delete },
  { method: 'GET', path: '/projects/{name}', config: Project.getOne },
  { method: 'GET', path: '/projects', config: Project.getAll },
  { method: 'PUT', path: '/projects/{name}', config: Project.update },

  // Versions
  { method: 'POST', path: '/projects/{name}/versions', config: Version.create },
  { method: 'DELETE', path: '/projects/{name}/versions/{version}', config: Version.delete },
  { method: 'GET', path: '/projects/{name}/versions', config: Version.get },
  { method: 'GET', path: '/versions', config: Version.getAll },
  { method: 'GET', path: '/projects/versions', config: Version.getAll },
  { method: 'GET', path: '/projects/{name}/versions/{version}', config: Version.getOne },
  { method: 'PUT', path: '/projects/{name}/versions/{version}', config: Version.update }
]
