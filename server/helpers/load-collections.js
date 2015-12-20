import Collections from '../collections'

export default function (orm) {
  for (let collection of Collections) {
    orm.loadCollection(collection)
  }
}
