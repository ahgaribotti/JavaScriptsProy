var express = require("express");
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(bodyParser.json());     // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

let mongoDbPass = "";
const uri = "mongodb+srv://user-tp:" + mongoDbPass + "@cluster0-mav7z.mongodb.net/test?retryWrites=true&w=majority";
//const uri = "mongodb://localhost:27017";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

MongoClient.connect(uri, options)
    .then(client => {
        const db = client.db('gastos-db');
        const collection = db.collection('gasto');
        app.locals.collection = collection;
    }).catch(error => console.error(error));

// modulos de rutas
var gastos = require("./routes/gastos");

// rutas
app.use("/gastos", gastos);

app.listen(3000, function () {
    console.log("Listening on port 3000!")
});