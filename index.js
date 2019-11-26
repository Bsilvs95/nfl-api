const express = require('express')
const bodyParser = require('body-parser')
const models = require('./models')
const { Op } = require('sequelize')

const app = express()



app.get('/teams', async (request, response) => {
    const teams = await models.Teams.findAll()
    response.send(teams)

})

app.get('/teams/:id', async (request, response) => {

    /*  const matchingTeams = teams.filter((team) => {
          return team.id === parseInt(request.params.id) || team.abbreviation.toUpperCase() === request.params.id.toUpperCase()
      })
  */

    const matchingTeams = await models.Teams.findAll({
        where: {
            [Op.or]: [{ id: request.params.id }, { abbreviation: request.params.id }]
        }
    })
    // like and if else
    return matchingTeams.length
        ? response.send(matchingTeams)
        : response.sendStatus(404)

})


app.use(bodyParser.json())

app.post('/teams', async (request, response) => {

    //deconstruct
    const { location, mascot, abbreviation, conference, division } = request.body

    //check for values
    if (!location || !mascot || !abbreviation || !conference || !division) {
        response.status(400).send('didnt provide one of the following : id, location, mascot, abbreviation, conference, division')
    }

    const newTeam = await models.Teams.create({ location, mascot, abbreviation, conference, division })

    // sends a created status
    response.status(201).send(newTeam)
})







const server = app.listen(1337, () => { console.log('Listening on port 1337') })



module.exports = server