const express = require('express')
const teams = require('./teams.json')

const app = express()



app.get('/teams', (request, response) => {

    response.send(teams)

})

app.get('/teams/', (request, response) => {

    const allTeams = teams.map((team) => {

        return team

    })
})



app.get('/teams/:id', (request, response) => {

    let matchingTeam = teams.filter((team) => {
        return team.id === parseInt(request.params.id)
    })
    let matchingAbb = teams.filter((team) => {
        return team.abbreviation === (request.params.id.toUpperCase())
    })
    if (!isNaN(request.params.id)) {


        if (matchingTeam.length) {

            response.send(matchingTeam)

        } else {

            response.status(404).send('Sorry, that id doesnt exist')

        }


    } else {

        if (matchingAbb.length) {

            response.send(matchingAbb)

        } else {

            response.status(404).send('Sorry, that Abbreviation doesnt exist')

        }

    }
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