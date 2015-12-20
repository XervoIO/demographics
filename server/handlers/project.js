import Boom from 'boom'
import Joi from 'joi'

let create = {
  validate: {
    payload: {
      name: Joi.string().required()
    }
  },
  handler: (request, reply) => {
    const Project = request.server.models.project

    Project.find({ name: request.payload.name }).exec((err, foundProject) => {
      if (err) return reply(Boom.badRequest(err))
      if (foundProject.length > 0) return reply(Boom.badRequest('A project by that name already exists.'))

      Project.create({ name: request.payload.name}).exec((err, newProject) => {
        if (err) return reply(Boom.badRequest(err))
        reply(newProject)
      })
    })
  }
}

export default {
  create: create
}
