const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// لما احد يدخل الرابط
app.get("/", function(req, res){
 res.sendFile(__dirname +"/index.html");

})
app.post("/", function(req, res){
  // console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "22ab9c1b3f317ff6fa6aa592926dc21b";
  const unit  = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";


      console.log(temp);
      console.log(weatherDescription);
      res.write("<h1>The temperature in "+query+" is " + temp + " degrees Celcius.</h1>");
      res.write("<h1> The weather currently is " + weatherDescription +"</h1>");
      res.write("<img src = "+imageURL+">");
      res.send();
    })
  })
  // console.log("Post request recieved");
})
// لما اسوي رن للسيرفر
app.listen(3000, function() {
  console.log("Server is running on port 3000.")
})
