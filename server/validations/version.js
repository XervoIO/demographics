const Joi = require('joi');

const PARAMS = {
  name: Joi.string().required(),
  version: Joi.string().required()
};

const PAYLOAD = {
  version: Joi.string(),
  loc: Joi.number().integer().min(0),
  coverage: Joi.number().min(0),
  dependencies: {
    major: Joi.number().integer().min(0),
    minor: Joi.number().integer().min(0),
    upToDate: Joi.number().integer().min(0)
  },
  devDependencies: {
    major: Joi.number().integer().min(0),
    minor: Joi.number().integer().min(0),
    upToDate: Joi.number().integer().min(0)
  }
};

exports.create = {
  params: {
    name: PARAMS.name
  },
  payload: PAYLOAD
};

exports.delete = {
  params: PARAMS
};

exports.get = {
  params: {
    name: PARAMS.name
  }
};

exports.getOne = {
  params: PARAMS
};

exports.update = {
  params: PARAMS,
  payload: PAYLOAD
};
