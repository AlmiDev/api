const express = require('express');
const dotenv =require('dotenv')
const morgan = require('morgan')('dev');
const config = require('./assets/config.json');
const axios = require('axios');
const twilio = require('twilio');
const {success, error, checkAndChange, formatNumber} = require('./assets/functionsAPI');
const app = express();
dotenv.config();

const PORT = process.env.PORT;
    
let MessageRouter = express.Router()

let Messages = require ('./assets/messages-class')(config)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    
    MessageRouter.route('/:number')

        .get( async(req,res) => {
            let listMessage = await Messages.getAllMessage(formatNumber(req.params.number))
            res.json(checkAndChange(listMessage))
        })
    app.use(config.routeAPI+'messages', MessageRouter)


//creation du serveur
app.listen (PORT, () => console.log ('Started apiMedylio v2 on port '+PORT))

