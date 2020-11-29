// Requiring module
const dotenv = require('dotenv')
dotenv.config()
const discord = require('discord.js')
const request = require('request')
const fetch = require('node-fetch')
//https://codeforces.com/api/contest.list?gym=true

// Creates a discord client
const client = new discord.Client()
const url = "https://codeforces.com/api/contest.list"

let options = { json: true }
     

// Runs whenever a message is sent
client.on('message', (message) => {
	// Checks if the message says "hello"
	if (message.content === 'contest') {

          request(url, options, (error, res, body) => {
				if (error) {
					return console.log(error)
				}

				if (!error && res.statusCode == 200) {
                     
                let response = ` `;
                   const arr1 = res.body.result
                   let i=0;
                   while(true)
                   {
                       if(arr1[i].phase === "BEFORE")
                       {
                           response+="Contest Name - "+arr1[i].name+'\n'
                           response+="Duration - "+(arr1[i].durationSeconds/3600)+" hours \n"
                           response+="Type - "+(arr1[i].type)+'\n\n'
                       }
                       else
                       {
                           break;
                       }
                       i=i+1;
                   }

                    message.channel.send(response)
				
				}
			})
 
	}
})

client.login(process.env.API_KEY)

