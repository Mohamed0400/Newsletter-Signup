const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(bodyParser({
  urlencoded: true
}));
app.use(express.static("public"));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});



app.post("/", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      margefields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: " https://us12.api.mailchimp.com/3.0/lists/72a8b7b308 ",
    method: "POST",
    headers: {
      "authorization": "Mega f110e7f7d6d58df63d55e4d934bb3df6-us12"
    },
    body: jsonData
  };
  request(options, (error, response, body) => {

    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

  });


});

// Completion handler
app.post("/failure" , (req , res) => {
  res.redirect("/")
});


app.listen( process.env.PORT || 3000 , () => {
  console.log("Server is running on port 3000");
});


// Mailchimp api key
// f110e7f7d6d58df63d55e4d934bb3df6-us12

// Mailchimp list ip
// 72a8b7b308
