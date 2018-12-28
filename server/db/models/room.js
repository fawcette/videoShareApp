const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Room = db.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = Room

/**
 * instanceMethods
 */
Room.prototype.correctPassword = function(candidatePwd) {
  return Room.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
Room.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

Room.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = room => {
  if (room.changed('password')) {
    room.salt = Room.generateSalt()
    room.password = Room.encryptPassword(room.password(), room.salt())
  }
}

Room.beforeCreate(setSaltAndPassword)
Room.beforeUpdate(setSaltAndPassword)
