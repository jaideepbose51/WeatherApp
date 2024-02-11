const express= require("express");
const bodyParser=require("body-parser");
const https=require("https");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
})
app.post("/",(req,res)=>{
    const query=req.body.cityName;
    const appKey="51121d6f9c76b8f75268b4191480656f";
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+appKey+"&q="+query+"&units=metric";
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            console.log(weatherData.weather[0].description);
            const wicon="https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
            res.write("<h1>The temp in "+query+" is</h1>" + "=>"+weatherData.main.temp);
            res.write("<h1>Weather Description is "+weatherData.weather[0].description+"</h1>");
            res.write("<img src="+wicon+">");

            res.send();
        })
})
})



app.listen(3000,(err)=>{
    if (err) throw err;
    console.log("Server started on port 3000");
});




