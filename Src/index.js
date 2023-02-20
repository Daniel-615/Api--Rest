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
            let climate =  JSON.stringify(data["weather"][0]["main"]); //lo vuelve json
            console.log(climate)
            let temperature = (parseFloat(JSON.stringify(data["main"]["temp"])) - 273.15);
            if (response.statusCode === 200) {
                res.send(`The main weather in ${city} is ${climate},
                current temperature is ${Math.round((temperature))} ° C.
                `);
            }
        }
    );
});
/*
{ "variables" : {' +
            '{ "temperature":temperature , "lastName":"Doe" },' +
            '{ "firstName":"Anna" , "lastName":"Smith" },' +
            '{ "firstName":"Peter" , "lastName":"Jones" } ]}';
*/
const port=3000;
app.listen(port, () => console.log(`Server started in port ${port}`))
console.log(`Api Key: ${process.env.APIKEY}`);