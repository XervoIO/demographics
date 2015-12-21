import Boom from 'boom'
import Joi from 'joi'

let create = {
  validate: {
    payload: {
      name: Joi.string().required(),
      maintainers: Joi.array(),
      description: Joi.string(),
      hasLinter: Joi.boolean(),
      hasReadme: Joi.boolean()
    }
  },
  handler: (request, reply) => {
    const {projects} = request.server.models

    projects.find({ name: request.payload.name }).exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (foundProject.length > 0) return reply(Boom.badRequest('A project by that name already exists.'))

      let toCreate = {
        name: request.payload.name,
        maintainers: request.payload.maintainers || [],
        description: request.payload.description || '',
        hasLinter: request.payload.hasLinter || false,
        hasReadme: request.payload.hasReadme || false
      }

      projects.create(toCreate).exec((err, newProject) => {
        if (err) return reply(Boom.badRequest(err))
        reply(newProject)
      })
    })
  }
}

let del = {
  validate: {
    params: {
      name: Joi.string().required()
    }
  },
  handler: (request, reply) => {
    const {projects} = request.server.models

    projects.destroy({ name: request.params.name }).exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (foundProject.length === 0) return reply(Boom.notFound('Project not found.'))
      reply()
    })
  }
}

let getOne = {
  validate: {
    params: {
      name: Joi.string().required()
    }
  },
  handler: (request, reply) => {
    const {projects} = request.server.models

    projects.findOne({ name: request.params.name }).exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (!foundProject) return reply(Boom.notFound('Project not found.'))
      reply(foundProject)
    })
  }
}

let getAll = {
  handler: (request, reply) => {
    const {projects} = request.server.models

    projects.find().exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      reply(foundProject)
    })
  }
}

let update = {
  validate: {
    params: {
      name: Joi.string().required()
    },
    payload: {
      name: Joi.string(),
      maintainers: Joi.array(),
      description: Joi.string(),
      hasLinter: Joi.boolean(),
      hasReadme: Joi.boolean()
    }
  },
  handler: (request, reply) => {
    const {projects} = request.server.models

    projects.update({
      name: request.params.name
    }, request.payload).exec((err, updatedProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (updatedProject.length === 0) return reply(Boom.notFound('Project not found.'))
      reply(updatedProject)
    })
  }
}

export default {
  create: create,
  delete: del,
  getOne: getOne,
  getAll: getAll,
  update: update
}
