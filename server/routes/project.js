const Project = require('../handlers/project');
const Validation = require('../validations/project');

exports.create = {
  handler: Project.create,
  validate: Validation.create
};

exports.delete = {
  handler: Project.delete,
  validate: Validation.delete
};

exports.getOne = {
  handler: Project.getOne,
  validate: Validation.getOne
};

exports.getAll = {
  handler: Project.getAll
};

exports.update = {
  handler: Project.update,
  validate: Validation.update
};
