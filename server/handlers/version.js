'use strict';

const Boom = require('boom');
const Logger = require('@modulus/logger')('server/handlers/version');

const Project = require('../models/project');
const Version = require('../models/version');

exports.create = function (request, reply) {
  Project.find({ name: request.params.name }, (err, foundProject) => {
    if (err) {
      Logger.error(`projects.find ${err.message}`);
      return reply(Boom.badRequest(err));
    }

    if (foundProject.length < 1) {
      Logger.error(`projects.find Project ${request.payload.name} not found`);
      return reply(Boom.badRequest('Project not found.'));
    }

    Version.find({
      name: request.params.name,
      version: request.payload.version
    }, (err, foundProjectVersion) => {
      if (err) {
        Logger.error(`versions.find ${err.message}`);
        return reply(Boom.badRequest(err));
      }

      if (foundProjectVersion &&
          foundProjectVersion.version === request.payload.version) {
        Logger.error(
          'versions.find Details for that versions have been entered'
        );
        return reply(Boom.badRequest(
          'Details for that versions have been entered.'
        ));
      }

      const payload = request.payload;
      const toCreate = {
        name: request.params.name,
        version: payload.version,
        loc: payload.loc,
        coverage: payload.coverage || 0,
        dependencies: {
          major: payload.dependencies ? payload.dependencies.major : 0,
          minor: payload.dependencies ? payload.dependencies.minor : 0,
          upToDate: payload.dependencies ? payload.dependencies.upToDate : 0
        },
        devDependencies: {
          major: payload.evDependencies ? payload.devDependencies.major : 0,
          minor: payload.devDependencies ? payload.devDependencies.minor : 0,
          upToDate: payload.devDependencies ? payload.devDependencies.upToDate : 0
        }
      };

      new Version(toCreate).save((err, newProjectVersion) => {
        if (err) {
          Logger.error(`versions.create ${err.message}`);
          return reply(Boom.badRequest(err));
        }

        Project.update(
          { name: newProjectVersion.name },
          { $push: { versions: newProjectVersion._id } }, (err) => { // eslint-disable-line no-underscore-dangle
            if (err) {
              Logger.error(`project.update ${err.message}`);
              return reply(Boom.badRequest(err));
            }

            reply(newProjectVersion);
          });
      });
    });
  });
};

exports.delete = function (request, reply) {
  Version.remove({
    name: request.params.name,
    version: request.params.version
  }, (err, foundProject) => {
    if (err) {
      Logger.error(`versions.destroy ${err.message}`);
      return reply(Boom.badRequest(err));
    }

    if (foundProject.length === 0) {
      Logger.error('versions.destroy Version not found');
      return reply(Boom.notFound('Version not found.'));
    }

    reply();
  });
};

exports.get = function (request, reply) {
  Version.find({ name: request.params.name }, (err, foundVersions) => {
    if (err) {
      Logger.error(`versions.findOne ${err.message}`);
      return reply(Boom.badRequest(err));
    }

    if (foundVersions.length < 1) {
      Logger.error(`versions.findOne No versions entered`);
      return reply(Boom.notFound('No versions entered.'));
    }

    reply(foundVersions);
  });
};

exports.getAll = function (request, reply) {
  Version.find({}, (err, foundVersions) => {
    if (err) {
      Logger.error(`versions.find ${err.message}`);
      return reply(Boom.badRequest(err));
    }

    reply(foundVersions);
  });
};

exports.getOne = function (request, reply) {
  Version.findOne({
    name: request.params.name,
    version: request.params.version
  }, (err, foundVersion) => {
    if (err) {
      Logger.error(`versions.findOne ${err.message}`);
      return reply(Boom.badRequest(err));
    }

    if (!foundVersion) {
      Logger.error(`versions.findOne Version not found`);
      return reply(Boom.notFound('Version not found.'));
    }

    reply(foundVersion);
  });
};

exports.update = function (request, reply) {
  Version.update({
    name: request.params.name,
    version: request.params.version
  }, request.payload, (err, updatedVersion) => {
    if (err) {
      Logger.error(`versions.update ${err.message}`);
      return reply(Boom.badRequest(err));
    }

    if (updatedVersion.length === 0) {
      Logger.error('versions.update error: Version not found');
      return reply(Boom.notFound('Version not found.'));
    }

    reply(updatedVersion);
  });
};
