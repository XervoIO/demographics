import {badRequest, notFound} from 'boom'
import Joi from 'joi'
import Logger from '@modulus/logger'

let logger = Logger('server/handlers/project')

import Project from '../models/project'

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
    Project.find({ name: request.payload.name }, (err, foundProject) => {
      if (err) {
        logger.error(`projects.find ${err.message}`)
        return reply(badRequest(err))
      }

      if (foundProject.length > 0) {
        logger.error(`projects.find Project ${request.payload.name} already exists`)
        return reply(badRequest('A project by that name already exists.'))
      }

      let toCreate = {
        name: request.payload.name,
        maintainers: request.payload.maintainers || [],
        description: request.payload.description || '',
        hasLinter: request.payload.hasLinter || false,
        hasReadme: request.payload.hasReadme || false
      }

      new Project(toCreate).save((err, newProject) => {
        if (err) {
          logger.error(`projects.create ${err.message}`)
          return reply(badRequest(err))
        }

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
    Project.remove({ name: request.params.name }, (err, foundProject) => {
      if (err) {
        logger.error(`projects.destroy ${err.message}`)
        return reply(badRequest(err))
      }

      if (foundProject.length === 0) {
        logger.error('projects.destroy Project not found')
        return reply(notFound('Project not found.'))
      }

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
    Project.findOne({
      name: request.params.name
    })
    .populate('versions')
    .exec((err, foundProject) => {
      if (err) {
        logger.error(`projects.findOne ${err.message}`)
        return reply(badRequest(err))
      }

      if (!foundProject) {
        logger.error(`projects.findOne Project ${request.payload.name} not found`)
        return reply(badRequest('Project not found.'))
      }

      reply(foundProject)
    })
  }
}

let getAll = {
  handler: (request, reply) => {
    Project.find({}).populate('versions').exec((err, foundProject) => {
      if (err) {
        logger.error(`projects.find ${err.message}`)
        return reply(badRequest(err))
      }

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
    Project.update({
      name: request.params.name
    }, request.payload, (err, updatedProject) => {
      if (err) {
        logger.error(`projects.findOne ${err.message}`)
        return reply(badRequest(err))
      }

      if (updatedProject.length < 1) {
        logger.error(`projects.find Project ${request.payload.name} not found`)
        return reply(badRequest('Project not found.'))
      }

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
