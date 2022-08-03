export default class Base {
  Id
  CreatedDate

  constructor(anId, aCreatedDate) {
    this.Id = anId != null ? anId : Base.newGuid()
    this.CreatedDate = aCreatedDate != null ? aCreatedDate : new Date()
  }

  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
}
