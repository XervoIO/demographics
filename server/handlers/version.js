import Boom from 'boom'
import Joi from 'joi'

let create = {
  validate: {
    params: {
      name: Joi.string().required()
    },
    payload: {
      version: Joi.string().required(),
      loc: Joi.number().integer().min(0),
      coverage: Joi.number().min(0),
      dependencies: {
        major: Joi.number().min(0),
        minor: Joi.number().min(0),
        upToDate: Joi.number().min(0)
      },
      devDependencies: {
        major: Joi.number().min(0),
        minor: Joi.number().min(0),
        upToDate: Joi.number().min(0)
      }
    }
  },
  handler: (request, reply) => {
    const {projects, versions} = request.server.models

    projects.find({ name: request.params.name }).exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (foundProject.length < 1) return reply(Boom.badRequest('Project not found.'))

      versions.find({
        projectName: request.params.name,
        version: request.payload.version
      }).exec((err, foundProjectVersion) => {
        if (err) return reply(Boom.badRequest(err))
        if (foundProjectVersion && foundProjectVersion.version === request.payload.version)
          return reply(Boom.badRequest('Details for that versions have been entered.'))

        let {coverage, dependencies, devDependencies, loc, version} = request.payload
        let toCreate = {
          projectName: request.params.name,
          version: version,
          loc: loc,
          coverage: coverage || 0,
          dependencies: {
            major: dependencies ? dependencies.major : 0,
            minor: dependencies ? dependencies.minor : 0,
            upToDate: dependencies ? dependencies.upToDate : 0
          },
          devDependencies: {
            major: devDependencies ? devDependencies.major : 0,
            minor: devDependencies ? devDependencies.minor : 0,
            upToDate: devDependencies ? devDependencies.upToDate : 0
          }
        }

        versions.create(toCreate).exec((err, newProjectVersion) => {
          if (err) return reply(Boom.badRequest(err))
          reply(newProjectVersion)
        })
      })
    })
  }
}

let del = {
  validate: {
    params: {
      name: Joi.string().required(),
      version: Joi.string().required()
    }
  },
  handler: (request, reply) => {
    const {versions} = request.server.models

    versions.destroy({
      projectName: request.params.name,
      version: request.params.version
    }).exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (foundProject.length === 0) return reply(Boom.notFound('Project version not found.'))
      reply()
    })
  }
}

let get = {
  validate: {
    params: {
      name: Joi.string().required()
    }
  },
  handler: (request, reply) => {
    const {versions} = request.server.models

    versions.find({ projectName: request.params.name }).exec((err, foundVersions) => {
      if (err) return reply(Boom.badRequest(err))
      if (foundVersions.length === 0) return reply(Boom.notFound('No versions entered.'))
      reply(foundVersions)
    })
  }
}

let getAll = {
  handler: (request, reply) => {
    const {versions} = request.server.models

    versions.find().exec((err, foundVersions) => {
      if (err) return reply(Boom.badRequest(err))
      reply(foundVersions)
    })
  }
}

export default {
  create: create,
  delete: del,
  get: get,
  getAll: getAll
}
