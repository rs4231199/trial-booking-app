const express = require("express");
const app = express();
var bodyParser = require('body-parser')
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "throwawaye558@gmail.com",
    pass: "Kk`3v}_@8fUD/;nj"
  }
});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
// app.use(express.urlencoded({
//   extended: true
// }));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.post("/", (req, res) => {
	console.log(req.body);
	var data = req.body;

	var mailOptions = {
	  from: "throwawaye558@gmail.com",
	  to: data.email_id,
	  subject: "NotchUp Trial Class Booked successfully",
	  text: "Dear " + data.parent_name + ",\n\n" + data.child_name + "\'s class at " + data.trial_date + " " + data.trial_time + " has been successfully booked."
	};

	transporter.sendMail(mailOptions, function(error, info) {
	  console.log("we reached in sendMail section.");
	  if (error) {
	    console.log(error);
	  } else {
	    console.log("Email sent: " + info.response);
	  }
	});
	res.send("recieved your request!");
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 8080, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
