const express = require('express')
const teams = require('./teams.json')
const bodyParser = require('body-parser')

const app = express()



app.get('/teams', (request, response) => {

    response.send(teams)

})


//why do i not need this, is it cause above
/* app.get('/teams/', (request, response) => {

    const allTeams = teams.map((team) => {

        return team

    })
}) */



app.get('/teams/:id', (request, response) => {


    const matchingTeams = teams.filter((team) => {
        return team.id === parseInt(request.params.id) || team.abbreviation.toUpperCase() === request.params.id.toUpperCase()
    })

    // like and if else
    return matchingTeams.length
        ? response.send(matchingTeams)
        : response.sendStatus(404)

})


app.use(bodyParser.json())

app.post('/teams', (request, response) => {

    //destruct
    const { id, location, mascot, abbreviation, conference, division } = request.body

    //check for values
    if (!id || !location || !mascot || !abbreviation || !conference || !division) {
        response.status(400).send('didnt provide one of the following : id, location, mascot, abbreviation, conference, division')
    }

    const newTeam = { id, location, mascot, abbreviation, conference, division }

    teams.push(newTeam)

    // sends a created status
    response.status(201).send(newTeam)
})







//check for nan
/*if (isNaN(parseInt(request.params.id))) {

    app.get('/teams/:abbreviation', (request, response) => {
        console.log(typeof request.params.abbreviation)
        const matchingAbbr = teams.filter((team) => {

            return team.abbreviation === request.params.abbreviation

        })

        if (matchingAbbr.length) {

            response.send(matchingAbbr)

        } else {

            response.status(404).send('Sorry, that Abbreviation doesnt exist')

        }

    })
} else {
    app.get('/teams/:id', (request, response) => {

        const matchingID = teams.filter((team) => {

            return team.id === parseInt(request.params.id)

        })

        if (matchingID.length) {

            response.send(matchingID)

        } else {

            response.status(404).send('Sorry, that id doesnt exist')

        }

    })
}
 */

/*app.get('/teams/:id', (request, response) => {

    const matchingID = teams.filter((team) => {

        return team.id === parseInt(request.params.id)

    })

    if (matchingID.length) {

        response.send(matchingID)

    } else {

        response.status(404).send('Sorry, that id doesnt exist')

    }

})



app.get('/teams/:abbreviation', (request, response) => {
    console.log(typeof request.params.abbreviation)
    const matchingAbbr = teams.filter((team) => {

        return team.abbreviation === request.params.abbreviation

    })

    if (matchingAbbr.length) {

        response.send(matchingAbbr)

    } else {

        response.status(404).send('Sorry, that Abbreviation doesnt exist')

    }

}) */


const server = app.listen(1337, () => { console.log('Listening on port 1337') })



module.exports = server