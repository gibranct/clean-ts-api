export class EmailInUseError extends Error {
  constructor () {
    super('The email received is already taken')
    this.name = 'EmailInUseError'
  }
}
