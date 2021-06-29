const axios = require('axios');
const dotenv =require('dotenv');
const { urlencoded } = require('express');
dotenv.config();
const ACCOUNT_SID = process.env.ACCOUNT_SID;
const AUTH_TOKEN = process.env.AUTH_TOKEN;
module.exports = (_config) => {
    config = _config
    return Messages
}

var fromMessage;
var toMessage;

let Messages = class {
    static getAllMessage(number) {
        console.log (number)

        return new Promise((next) => {

                axios.get(
                  'https://api.twilio.com/2010-04-01/Accounts/'+ACCOUNT_SID+'/Messages.json?From='+number,
                  //'https://api.twilio.com/2010-04-01/Accounts/'+ACCOUNT_SID+'/Messages.json?PageSize=5&From='+number, //with pageSize definition
                  {
                      auth: {
                          username: ACCOUNT_SID,
                          password: AUTH_TOKEN
                      }
                  })
                    .then ((response) => {
                      fromMessage=response.data.messages 

                      axios.get(
                        'https://api.twilio.com/2010-04-01/Accounts/'+ACCOUNT_SID+'/Messages.json?To='+number,
                        //'https://api.twilio.com/2010-04-01/Accounts/'+ACCOUNT_SID+'/Messages.json?PageSize=5&To='+number, //with pageSize definition
                        {
                            auth: {
                                username: ACCOUNT_SID,
                                password: AUTH_TOKEN
                            }
                        })
                        .then ((response) => {
                            toMessage=response.data.messages 
                            var listMessage =[...fromMessage,...toMessage]
                            listMessage.sort(function (a, b) { 
                              return new Date(b.date_updated) - new Date(a.date_updated);
                            });
              
                            next (listMessage.reverse())

                        }).catch(function (error) {
                          console.log(error);
                        });
                  })
                    .catch(function (error) {
                        console.log(error);
                      });
          })

    }
}

