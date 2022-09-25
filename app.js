const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

//API key :
// 8168408ee3a0dfcbe3a645396b073bc4

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    const query = req.body.location;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=metric&appid=8168408ee3a0dfcbe3a645396b073bc4";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png";
            res.write("<h1>The temperature in " + city + " is " + temp + "</h1>");
            res.write("<img src="+ imageURL +">");
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("Server is running at port 3000.")
})
