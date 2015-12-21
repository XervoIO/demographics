import Waterline from 'waterline'

export default Waterline.Collection.extend({
  tableName: 'projects',
  connection: 'mongo',
  schema: true,

  attributes: {
    name: { type: 'string', required: true, index: true },
    maintainers: { type: 'array' },
    description: { type: 'string' },
    hasLinter: { type: 'boolean' },
    hasReadme: { type: 'boolean' },
  }
})
