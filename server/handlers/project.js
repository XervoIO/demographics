import Boom from 'boom'
import Joi from 'joi'

let create = {
  validate: {
    payload: {
      name: Joi.string().required()
    }
  },
  handler: (request, reply) => {
    const {project} = request.server.models

    project.find({ name: request.payload.name }).exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (foundProject.length > 0) return reply(Boom.badRequest('A project by that name already exists.'))

      project.create({ name: request.payload.name}).exec((err, newProject) => {
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
    const {project} = request.server.models

    project.destroy({ name: request.params.name }).exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (foundProject.length === 0) return reply(Boom.notFound('Project not found.'))
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
    const {project} = request.server.models

    project.find({ name: request.params.name }).exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (foundProject.length === 0) return reply(Boom.notFound('Project not found.'))
      reply(foundProject)
    })
  }
}

let getAll = {
  handler: (request, reply) => {
    const {project} = request.server.models

    project.find().exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      reply(foundProject)
    })
  }
}

export default {
  create: create,
  delete: del,
  get: get,
  getAll: getAll
}
