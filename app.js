//import all required Module

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const axios = require('axios');
const { response } = require('express');
const ejs = require('ejs')
var bitly = require('bitly-node-api')('b1db544263942e66d1380d48de6806264bfba55b');
let reUrl = '';


//const app using express framwork
const app = express()
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: true}));



//Get Request 
app.get('/', function(req, res){
   res.render('module', {shortUrl: reUrl})
});

//Post request

app.post("/", async function (req, res){
  let input = req.body.url;
  console.log(input);
  let userToken = 'b1db544263942e66d1380d48de6806264bfba55b';

  bitly.setUserToken(userToken);
  var data = {
  long_url: input
    }
  try {
  var response = await bitly.bitlinks.createBitlink(data);
} catch (error) {
  console.log('server error')
  return;
}
console.log(response)
  reUrl = response.link
  res.redirect("/")
  res.end();
});
console.log(reUrl)

      
  
//Create Server To listen
app.listen(process.env.PORT ||  3000, function(){
  console.log('server is online on port');
})


