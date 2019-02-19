let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

let apiRoutes = require("./api-routes");

const uri = 'mongodb+srv://new-punnyhooman:dhruv007@cluster0-fmrc2.mongodb.net/test?retryWrites=true';

 mongoose.connect(uri,{useNewUrlParser:true});


app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(bodyParser.json());


var port = process.env.PORT || 8080;

app.use('/api',apiRoutes);

app.listen(port,function(){
    console.log("Running on port"+ port);
});