const express = require('express');
const morgan = require('morgan')('dev');
const config = require('./assets/config.json');
const axios = require('axios');
const twilio = require('twilio');
const qs = require('qs');
const {success, error, checkAndChange} = require('./assets/functionsAPI');
const app = express()

console.log ('toto')
   
    
let MessageRouter = express.Router()

let Messages = require ('./assets/messages-class')(config)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    
    MessageRouter.route('/')

        .get( async(req,res) => {
            console.log('call class with number '+req.body.number)
            //console.log('call class with number'+req.params.number)

            let listMessage = await Messages.getAllMessage(req.body.number)

            //console.log(listMessage[0].body)
            console.log ('end of class CALL')
            console.log(typeof(listMessage))
            res.json(checkAndChange(listMessage))

        })

    app.use(config.routeAPI+'messages', MessageRouter)


    

//creation du serveur
app.listen (config.port, () => console.log ('Started apiMedylio on port '+config.port))

