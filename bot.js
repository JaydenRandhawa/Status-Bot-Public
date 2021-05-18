require('dotenv').config()
  
var app = require('express')();
var http = require('http').createServer(app);

const Discord = require('discord.js');
const { json } = require('express');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

  app.get('/users/:id', (req, res) => {

    var user = client.users.cache.find(user => user.id === req.params.id);
    var userData = {
      User:[
        {
          username: user.username,
          clientStatus: user.presence.clientStatus,
          activities: user.presence.activities
        }        
      ]
    }
    res.send(JSON.stringify(userData));
  });

  app.get('/cls', (req, res) => {
    res.send(200);
    console.clear();
  });
  
client.login(process.env.BOT_TOKEN);

http.listen(8081, () => {
  console.log(`listening on port*:${8081}`);
});