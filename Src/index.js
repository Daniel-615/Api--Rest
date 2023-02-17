const express = require('express');
const request = require('request');
const app = express();
app.get("/", (req,res) => {
    let city = req.query.city;
    request(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f7623a14561988111d0e134a12f962c6`,
        function (error, response, body) {
            let data = JSON.parse(body);
            let climate =  JSON.stringify(data["weather"][0]["main"]);
            let temperature = (parseFloat(JSON.stringify(data["main"]["temp"])) - 273.15);
            if (response.statusCode === 200) {
                res.send(`The main weather in ${city} is ${climate},
                current temperature is ${Math.round((temperature))} ° C.
                `);
            }
        }
    );
});

const port=3000;
app.listen(port, () => console.log(`Server started in port ${port}`))