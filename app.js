const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;


    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us3.api.mailchimp.com/3.0/lists/2a85ed2bad",
        method: "POST",
        headers: {
            "Authorization": " shiva1 6e9a8adada7be5ff5be9372cfb029bb2-us3"
        },

        body : jsonData

    };

    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {

                res.sendFile(__dirname + "/success.html");

            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }

    });

});

app.post("/failur", function (req, res) {
    res.redirect("/");
});


//////api key////
/////    6e9a8adada7be5ff5be9372cfb029bb2-us3

////// list_id////
//////   2a85ed2bad


////////////////////////////////////////
app.listen(3000, function () {
    console.log("port 3000 is working Go ahead...");
});