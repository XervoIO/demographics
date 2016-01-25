const Joi = require('joi');

const PARAMS = {
  name: Joi.string().required()
};

const PAYLOAD = {
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
};

exports.create = {
  payload: PAYLOAD
};

exports.delete = {
  params: PARAMS
};

exports.getOne = {
  params: PARAMS
};

exports.update = {
  params: PARAMS,
  payload: PAYLOAD
};
