var express = require('express');

var app = express();

// express is used to route requests
app.get('/',function(request, response){
    response.send('Hello from library app.');
}); 


//now we can run app using command: node app.js
// this command only runs the js file
//thus understand express is just another js file.
app.listen(3000,function() {
    console.log('listening on port 3000');
});
