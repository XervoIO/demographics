import Waterline from 'waterline'

export default Waterline.Collection.extend({
  tableName: 'versions',
  connection: 'mongo',
  schema: true,

  attributes: {
    projectName: { type: 'string', required: true, index: true },
    version: { type: 'string', required: true, index: true },
    loc: { type: 'integer', required: true },
    coverage: { type: 'float', required: true },
    dependencies: { type: 'json', required: true },
    devDependencies: { type: 'json', required: true }
  }
})
