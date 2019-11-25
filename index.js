const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/" , function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req,res){
//  console.log(req.body.crypto);
var crypto = req.body.crypto;
var fiet = req.body.fiet;
var amount = req.body.amount;

var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

var options = {
  url: "https://apiv2.bitcoinaverage.com/convert/global",
  method:"GET",
  qs: {
    from: crypto,
    to:fiet,
    amount: amount

  }
}

request(options ,function(error,response,body){

  var data = JSON.parse(body);
  var price =data.price;
  var date = data.time;
  console.log(price);

  res.write("<h1> The price of "+amount+" "+crypto+" is"+" "+ price+" "+ fiet+"</h1>");

  res.write("<p> On " + date+"  </p>");

  res.send()

})
});

app.listen(3000 , function(){
  console.log("Server is running on port 3000.")
});
