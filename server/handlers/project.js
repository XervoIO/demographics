'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Logger = require('@modulus/logger')('server/handlers/project');

const Project = require('../models/project');

exports.create = {
  validate: {
    payload: {
      name: Joi.string().required(),
      maintainers: Joi.array(),
      description: Joi.string(),
      hasLicense: Joi.boolean(),
      hasLinter: Joi.boolean(),
      hasReadme: Joi.boolean(),
      engines: {
        npm: Joi.string(),
        node: Joi.string()
      }
    }
  },
  handler: (request, reply) => {
    Project.find({ name: request.payload.name }, (err, foundProject) => {
      if (err) {
        Logger.error(`projects.find ${err.message}`);
        return reply(Boom.badRequest(err));
      }

      if (foundProject.length > 0) {
        Logger.error(
          `projects.find Project ${request.payload.name} already exists`
        );
        return reply(Boom.badRequest('A project by that name already exists.'));
      }

      const payload = request.payload;
      const toCreate = {
        name: payload.name,
        maintainers: payload.maintainers || [],
        description: payload.description || '',
        hasLicense: payload.hasLicense || false,
        hasLinter: payload.hasLinter || false,
        hasReadme: payload.hasReadme || false,
        engines: {
          npm: payload.engines ? payload.engines.npm : '0.0.0',
          node: payload.engines ? payload.engines.node : '0.0.0'
        }
      };

      new Project(toCreate).save((err, newProject) => {
        if (err) {
          Logger.error(`projects.create ${err.message}`);
          return reply(Boom.badRequest(err));
        }

        reply(newProject);
      });
    });
  }
};

exports.delete = {
  validate: {
    params: {
      name: Joi.string().required()
    }
  },
  handler: (request, reply) => {
    Project.remove({ name: request.params.name }, (err, foundProject) => {
      if (err) {
        Logger.error(`projects.destroy ${err.message}`);
        return reply(Boom.badRequest(err));
      }

      if (foundProject.length === 0) {
        Logger.error('projects.destroy Project not found');
        return reply(Boom.notFound('Project not found.'));
      }

      reply();
    });
  }
};

exports.getOne = {
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
        Logger.error(`projects.findOne ${err.message}`);
        return reply(Boom.badRequest(err));
      }

      if (!foundProject) {
        Logger.error(
          `projects.findOne Project ${request.payload.name} not found`
        );
        return reply(Boom.badRequest('Project not found.'));
      }

      reply(foundProject);
    });
  }
};

exports.getAll = {
  handler: (request, reply) => {
    Project.find({}).populate('versions').exec((err, foundProject) => {
      if (err) {
        Logger.error(`projects.find ${err.message}`);
        return reply(Boom.badRequest(err));
      }

      reply(foundProject);
    });
  }
};

exports.update = {
  validate: {
    params: {
      name: Joi.string().required()
    },
    payload: {
      name: Joi.string(),
      maintainers: Joi.array(),
      description: Joi.string(),
      hasLicense: Joi.boolean(),
      hasLinter: Joi.boolean(),
      hasReadme: Joi.boolean(),
      engines: {
        npm: Joi.string(),
        node: Joi.string()
      }
    }
  },
  handler: (request, reply) => {
    Project.update({
      name: request.params.name
    }, request.payload, (err, updatedProject) => {
      if (err) {
        Logger.error(`projects.findOne ${err.message}`);
        return reply(Boom.badRequest(err));
      }

      if (updatedProject.length < 1) {
        Logger.error(`projects.find Project ${request.payload.name} not found`);
        return reply(Boom.badRequest('Project not found.'));
      }

      reply(updatedProject);
    });
  }
};
