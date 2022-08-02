'use strict';
console.log('server is connected!!!');


//Requires
// in our requires we have to use 'require instead of import
// here we will list the requirements for a server
const express = require('express');
require('dotenv').config();
let data = require('./pizzaData/data.json');
const cors = require('cors');

//use
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

/**
 * once we have required something, we have to use it theis is where we assign the required file a variable name REact does this in one step with import
 * it says we must use it and assign it a var
 * with Express takes 2 steps : 'require' then 'use'
 * this is just how express works.
 */



//ROUTES is what we use to access our end points
/**
 * .get() is an express method
 * it correlates to axios.get
 * the first param is a url in quote
 * the second is a callback 90
 * / is the root of our server
 * 
 * npm i -g nodemon
 */
app.get('/', (request, response) => {
  //we want to send something back
  response.send('Hello from our SERVER!!'
  );
});


app.get('/hello', (request, response) => {
  //localhost:3001/hello?name=bob&lastname=trapp
  console.log('SSSSSSERVER req',request.query.name);
  let name = request.query.name;
  let lastName = request.query.lastname;
  response.send(`hello ${name} ${lastName} welcome to our server.`);
});

app.get('/pizza', (request, response) =>{
  try{
    //http://localhost:3001/pizza?pizzatype=Chicago
    //
    let pizzaType = request.query.pizzatype;
    console.log('type of pizza',pizzaType);
    //add data file, look at find() will find the first and return only that match.
    // let dataToSend =data.find(pizza => pizza.pizzatype === pizzaType);
    let dataToInstant =data.find(pizza => pizza.pizzatype === pizzaType);
    let dataToSend = new Pizza(dataToInstant);
    // console.log('DATATATATAT',dataToSend);
    response.send(dataToSend);

  }catch(error){
    // eslint-disable-next-line no-undef
    next(error);
  }

});




app.get('*', (request, response) => {
  response.send('the route does not exsist, sorry. ERROR 404');
});
//Class for constructing our object
//so we can send this an object and it will contruct it as an instance of pour pizza object
class Pizza{
  constructor(pizzaObject){
    console.log('Pizza in class constructing pizza object', pizzaObject);
    this.pizzaType = pizzaObject.pizzatype;
    this.location = pizzaObject.location;
  }
}








//errors
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});



//listen for our port
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
