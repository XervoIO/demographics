const Version = require('../handlers/version');
const Validation = require('../validations/version');

exports.create = {
  handler: Version.create,
  validate: Validation.create
};

exports.delete = {
  handler: Version.delete,
  validate: Validation.delete
};

exports.get = {
  handler: Version.get,
  validate: Validation.get
};

exports.getOne = {
  handler: Version.getOne,
  validate: Validation.getOne
};

exports.getAll = {
  handler: Version.getAll
};

exports.update = {
  handler: Version.update,
  validate: Validation.update
};
