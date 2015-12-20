import Waterline from 'waterline'

export default Waterline.Collection.extend({
  tableName: 'project',
  connection: 'mongo',
  schema: true,

  attributes: {
    name: { type: 'string', required: true, index: true }
  }
})
