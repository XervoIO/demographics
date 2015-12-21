import {badRequest, notFound} from 'boom'
import Joi from 'joi'

let create = {
  validate: {
    params: {
      name: Joi.string().required()
    },
    payload: {
      version: Joi.string(),
      loc: Joi.number().integer().min(0),
      coverage: Joi.number().min(0),
      dependencies: {
        major: Joi.number().integer().min(0),
        minor: Joi.number().integer().min(0),
        upToDate: Joi.number().integer().min(0)
      },
      devDependencies: {
        major: Joi.number().integer().min(0),
        minor: Joi.number().integer().min(0),
        upToDate: Joi.number().integer().min(0)
      }
    }
  },
  handler: (request, reply) => {
    const {projects, versions} = request.server.models

    projects.find({ name: request.params.name }).exec((err, foundProject) => {
      if (err) return reply(badRequest(err))
      if (foundProject.length < 1) return reply(badRequest('Project not found.'))

      versions.find({
        projectName: request.params.name,
        version: request.payload.version
      }).exec((err, foundProjectVersion) => {
        if (err) return reply(badRequest(err))
        if (foundProjectVersion && foundProjectVersion.version === request.payload.version)
          return reply(badRequest('Details for that versions have been entered.'))

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
          if (err) return reply(badRequest(err))
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
      if (err) return reply(badRequest(err))
      if (foundProject.length === 0) return reply(notFound('Version not found.'))
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
      if (err) return reply(badRequest(err))
      if (foundVersions.length === 0) return reply(notFound('No versions entered.'))
      reply(foundVersions)
    })
  }
}

let getAll = {
  handler: (request, reply) => {
    const {versions} = request.server.models

    versions.find().exec((err, foundVersions) => {
      if (err) return reply(badRequest(err))
      reply(foundVersions)
    })
  }
}

let getOne = {
  validate: {
    params: {
      name: Joi.string().required(),
      version: Joi.string().required()
    }
  },
  handler: (request, reply) => {
    const {versions} = request.server.models

    versions.findOne({
      projectName: request.params.name,
      version: request.params.version
    }).exec((err, foundVersion) => {
      if (err) return reply(badRequest(err))
      if (!foundVersion) return reply(notFound('Version not found.'))
      reply(foundVersion)
    })
  }
}

let update = {
  validate: {
    params: {
      name: Joi.string().required(),
      version: Joi.string().required()
    },
    payload: {
      version: Joi.string(),
      loc: Joi.number().integer().min(0),
      coverage: Joi.number().min(0),
      dependencies: {
        major: Joi.number().integer().min(0),
        minor: Joi.number().integer().min(0),
        upToDate: Joi.number().integer().min(0)
      },
      devDependencies: {
        major: Joi.number().integer().min(0),
        minor: Joi.number().integer().min(0),
        upToDate: Joi.number().integer().min(0)
      }
    }
  },
  handler: (request, reply) => {
    const {versions} = request.server.models

    versions.update({
      projectName: request.params.name,
      version: request.params.version
    }, request.payload).exec((err, updatedVersion) => {
      if (err) return reply(badRequest(err))
      if (updatedVersion.length === 0) return reply(notFound('Version not found.'))
      reply(updatedVersion)
    })
  }
}

export default {
  create: create,
  delete: del,
  get: get,
  getAll: getAll,
  getOne: getOne,
  update: update
}
