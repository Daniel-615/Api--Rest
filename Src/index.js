require('dotenv').config()
const express = require('express');
const request = require('request');
const app = express();
app.get("/", (req,res) => {
    let city = req.query.city;
    request(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APIKEY}`,
        function (error, response, body) {
            let data = JSON.parse(body);
            let description= JSON.stringify(data["weather"][0]["description"]);
            let icon= JSON.stringify(data["weather"][0]["icon"]);
            let temperature = (parseFloat(JSON.stringify(data["main"]["temp"])) - 273.15);
            res.status(200).json(`${Math.round(temperature)}${description}${icon}`);
        }
    );
});
const port=3000;
app.listen(port, () => console.log(`Server started in port ${port}`))
