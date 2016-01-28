'use strict';

const Boom = require('boom');
const Logger = require('@modulus/logger')('server/handlers/project');

const Project = require('../models/project');


exports.create = function (request, reply) {
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

    const toCreate = {
      name: request.payload.name,
      maintainers: request.payload.maintainers || [],
      description: request.payload.description || '',
      hasLinter: request.payload.hasLinter || false,
      hasReadme: request.payload.hasReadme || false
    };

    new Project(toCreate).save((err, newProject) => {
      if (err) {
        Logger.error(`projects.create ${err.message}`);
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
  });
};

exports.delete = function (request, reply) {
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
};

exports.getOne = function (request, reply) {
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
};

exports.getAll = function (request, reply) {
  var query = Project.find({});

  query.sort({ name: request.query.sort || 'asc' });
  query.limit(parseInt(request.query.limit, 10) || 10);
  query.skip(parseInt(request.query.offset, 10) || 0);

  query.populate('versions').exec((err, foundProject) => {
    if (err) {
      Logger.error(`projects.find ${err.message}`);
      return reply(Boom.badRequest(err));
    }

    reply(foundProject);
  });
};

exports.update = function (request, reply) {
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
};
