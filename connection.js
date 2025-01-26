import crypto from "crypto"

export default class Connection {
  _users = new Map()

  get connectedUsers() {
    return [...this._users.keys()]
  }

  registerUser(userId, response) {
    if (!this._users.has(userId)) {
      this._users.set(userId, [])
    }

    const connectionId = this.generateConnectionId()
    this._users.get(userId).push({ connectionId, response })
    return connectionId
  }

  removeUser(userId, connectionId) {
    if (!this._users.has(userId)) {
      return
    }

    const connections = this._users
      .get(userId)
      .filter((connection) => connection.connectionId !== connectionId)

    if (connections.length) {
      this._users.set(userId, connections)
    } else {
      this._users.delete(userId)
    }
  }

  generateConnectionId() {
    return crypto.randomBytes(20).toString("hex")
  }
}
