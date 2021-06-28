const axios = require('axios');
module.exports = (_config) => {

    config = _config
    return Messages

}

let Messages = class {
   
    
    static getAllMessage(number) {


        var data 
        
        var configTwilio = {
          method: 'get',
          url: 'https://api.twilio.com/2010-04-01/Accounts/AC41c688c55f9b9f9ab4703508dc54cb62/Messages.json?PageSize=2000',
          //url: 'https://api.twilio.com/2010-04-01/Accounts/AC41c688c55f9b9f9ab4703508dc54cb62/Messages.json?From=%2B33787233553',
          //url: 'https://api.twilio.com/2010-04-01/Accounts/AC41c688c55f9b9f9ab4703508dc54cb62/Messages.json?From=%2B33664665619',
          headers: { 
            'Authorization': 'Basic QUM0MWM2ODhjNTVmOWI5ZjlhYjQ3MDM1MDhkYzU0Y2I2MjpjZmFmZmY1MWEzMDZiMTg2NmEzOGIzMjdkY2E3ODQ0Mw=='
          },
          data : data
        };
        console.log('in the calsss with number '+ number)
        return new Promise((next) => {

                axios(configTwilio)
                    .then ((response) => {
                      console.log(typeof(response.data.messages))
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
                          //list3 = [...list3, value]
                          //list3 = Object.assign(list3, value)
                          //console.log(value)
                          console.log('------------')
                          //console.log(list3)
                        }
                        
                      })
                      next (list3.reverse())

                    })
                    .catch(function (error) {
                        console.log(error);
                      });



        })

    }
}

