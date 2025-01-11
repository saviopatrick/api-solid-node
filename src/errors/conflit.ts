export class Conflit extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Conflit'
    Object.setPrototypeOf(this, Conflit.prototype)
  }
}
