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
        console.log('in the calsss with number '+ number)
        //var formatNumber = '%2B'+number.slice(1)
        //number.formatNumber()
        console.log (number)


        //console.log(encodeURI(number))
        //var urlA = encodeURI('https://api.twilio.com/2010-04-01/Accounts/'+ACCOUNT_SID+'/Messages.json?PageSize=5&From'+number)
        //console.log(encodeURI(urlA))
        
        return new Promise((next) => {

                axios.get(
                  //'https://api.twilio.com/2010-04-01/Accounts/'+ACCOUNT_SID+'/Messages.json?PageSize=5&From=%2B33664665619',
                  'https://api.twilio.com/2010-04-01/Accounts/'+ACCOUNT_SID+'/Messages.json?PageSize=5&From='+number,
                  //urlA,
                  {
                      auth: {
                          username: ACCOUNT_SID,
                          password: AUTH_TOKEN
                      }
                  })
                    .then ((response) => {
                      /*
                      console.log('new call inside then')
                     console.log(response) 
                      console.log('------------')
                      console.log('------------')                      
                      */
                      fromMessage=response.data.messages 
                      
                      console.log('from message :')
                      console.log(fromMessage)
                      console.log('------------')
                      console.log('------------')
                      

                      axios.get(
                        //'https://api.twilio.com/2010-04-01/Accounts/'+ACCOUNT_SID+'/Messages.json?PageSize=5&To=%2B33664665619',
                        'https://api.twilio.com/2010-04-01/Accounts/'+ACCOUNT_SID+'/Messages.json?PageSize=5&To='+number,
                        {
                            auth: {
                                username: ACCOUNT_SID,
                                password: AUTH_TOKEN
                            }
                        })
                        .then ((response) => {
                                toMessage=response.data.messages
                                //console.log(response) 
                                
                                console.log('to message :')
                                console.log(toMessage)
                                console.log('------------')
                                console.log('------------')
                                console.log('on mix')
                                
                                var list =[...fromMessage,...toMessage]
                                //console.log(typeof(response.data.messages))
                                /*
                                var list = response.data.messages
                                console.log(response.data)
                                console.log(list.length)
                                var list2
                                var list3 = new Array()
                                console.log('numero attendu ' + number)
                                Object.entries(list).forEach(([key, value]) => {
                                  if (value.from == number || value.to == number ) {
                                    console.log('entrée trouvée')
                                    console.log (' - fom : '+value.from+' - to : '+value.to+' - body : '+value.body )
                                    list3.push(value)
                                    console.log('------------')
                                  }
                                  
                                })
                                */
                                list.sort(function (a, b) {
                                  // Turn your strings into dates, and then subtract them
                                  // to get a value that is either negative, positive, or zero.
                                  
                                  /*
                                  console.log (b.date_updated)
                                  console.log (new Date(b.date_updated))
                                  console.log('------------')
                                  console.log (a.date_updated)
                                  console.log (new Date(a.date_updated))
                                  console.log('------------')
                                  console.log (new Date(b.date_updated) - new Date(a.date_updated))
                                  console.log('------------')
                                  console.log('------------')
                                  */
                                  
                                  return new Date(b.date_updated) - new Date(a.date_updated);
                                  });
                  

                                next (list.reverse())


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

