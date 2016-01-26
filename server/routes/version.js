const Handler = require('../handlers/version');
const Validation = require('../validations/version');

exports.create = {
  handler: Handler.create,
  validate: Validation.create
};

exports.delete = {
  handler: Handler.delete,
  validate: Validation.delete
};

exports.get = {
  handler: Handler.get,
  validate: Validation.get
};

exports.getOne = {
  handler: Handler.getOne,
  validate: Validation.getOne
};

exports.getAll = {
  handler: Handler.getAll
};

exports.update = {
  handler: Handler.update,
  validate: Validation.update
};
