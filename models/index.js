const Sequelize = require('sequelize')
const teamsModel = require('./teams')

const connection = new Sequelize('football', 'football', 'F00TBall', {
    host: 'localhost', dialect: 'mysql'
})

const Teams = teamsModel(connection, Sequelize)

module.exports = { Teams }