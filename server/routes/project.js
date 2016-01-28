const Handler = require('../handlers/project');
const Validation = require('../validations/project');

exports.create = {
  handler: Handler.create,
  validate: Validation.create
};

exports.delete = {
  handler: Handler.delete,
  validate: Validation.delete
};

exports.getOne = {
  handler: Handler.getOne,
  validate: Validation.getOne
};

exports.getAll = {
  handler: Handler.getAll,
  validate: Validation.getAll
};

exports.update = {
  handler: Handler.update,
  validate: Validation.update
};
