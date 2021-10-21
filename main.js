//Javascript code for travel experts database//
//Authored by : Daogeng Jiang and Sai Shalini Karaikatte Venugopal//
//Last Edited on 26 June 2021//

//Declaring dependencies used in file//
const express = require("express");
const moment = require("moment");
const mysql = require("mysql");
const app = express();
const path = require("path");

const url = require('url');
app.use(express.static("views", {
	"extensions": ["html", "htm", "php"]
}));
app.use(express.static("public"));
app.use(express.urlencoded({
	extended: true
}));

//Start listening on port 8000//
app.listen(8000, () => {
	console.log("Server started");
});

//Including folder views and pug files//
app.use(express.static("views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Connecting to html files in the views folder//
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/tehome.html");
});


app.get("/contact", (req, res) => {
	res.sendFile(__dirname + "/views/tecontact.html");
});


app.get("/packages", (req, res) => {
	res.sendFile(__dirname + "/views/tevacation.html");
});

app.get("/homepage", (req, res) => {
	res.sendFile(__dirname + "/views/tehome.html");
});

app.get("/register", (req, res) => {
	res.sendFile(__dirname + "/views/teregister.html");
});

//Parsing the package details from the vacation page to order form//
app.get('/order/?*', (req, res) => {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	console.log("PackageId:", query.pkgid)
	res.sendFile(__dirname + "/views/teorder.html");
});

//Code to fetchagent details from the database and displaying it in the contacts page//
//Author: Daogeng Jiang//
app.get("/getagents", (req, res) => {
	const conn = mysql.createConnection({
		host: "localhost",
		user: "Shalini",
		password: "password",
		database: "travelexperts",
		multipleStatements: true
	});

	conn.connect((err) => {
		if (err) throw err;
		var agency = "select A.*, B.* from agencies A, agents B";
		conn.query(agency, (err, result, fields) => {
			if (err) throw err;
			res.writeHead(200, {
				"content-type": "text/html"
			});
			res.write("<!DOCTYPE html><html><head><title>All Agencies</title></head><body>");
			res.write("<div style='align-items:center;margin:0 20%;max-width:1000px'><h2><u>Detailed Contact Information</u></h2>");
			res.write("<h3>Agency 1 Location</h3>");
			res.write("<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.3842415594377!2d-114.09055968457209!3d51.04599255215505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716fe76e972489%3A0x149461cedf5b7c5b!2s1155%208%20Ave%20SW%2C%20Calgary%2C%20AB!5e0!3m2!1sen!2sca!4v1624677837653!5m2!1sen!2sca' width='400' height='250' style='border:0;' allowfullscreen='' loading='lazy'></iframe>");
			res.write("<h3>Agents from this Agency</h3>");

			for (var i = 0; i < result.length; i++) {
				if ((result[i].AgencyId == 1) && (i % 2 == 0)) {

					res.write("<div><img src='media/contactcard.jpg' style='width:100px;float:left' /> Name: " + result[i].AgtFirstName + " " + result[i].AgtLastName + "<br />Business Phone: " + result[i].AgtBusPhone + "<br />Email: " + result[i].AgtEmail + "<br /><br /><br /></div>");
				}
			}

			res.write("<h3>Agency 2 Location</h3>");
			res.write("<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2525.6940174225438!2d-113.97649398458418!3d50.72561557538091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537199c0c6d6b5d7%3A0x86c6d09be8bf79ce!2sMain%20Street%20Market%20%26%20More!5e0!3m2!1sen!2sca!4v1624678281741!5m2!1sen!2sca' width='400' height='250' style='border:0;' allowfullscreen='' loading='lazy'></iframe>");
			for (var i = 0; i < result.length; i++) {
				if ((result[i].AgencyId == 2) && (i % 2 == 0)) {
					res.write("<div><img src='media/contactcard.jpg' style='width:100px;float:left' /> Name: " + result[i].AgtFirstName + " " + result[i].AgtLastName + "<br />Business Phone: " + result[i].AgtBusPhone + "<br />Email: " + result[i].AgtEmail + "<br /><br /><br /></div>");
				}
			}

			res.write("</table></body></html>");
			res.end();
		});
		conn.end((err) => {
			if (err) throw err;
		});
	});
});


//Code to fetch package details from the database//
//Author: Daogeng Jiang// 
app.get("/getpackages", (req, res) => {
	const conn = mysql.createConnection({
		host: "localhost",
		user: "Shalini",
		password: "password",
		database: "travelexperts",
		multipleStatements: true
	});

	conn.connect((err) => {
		if (err) throw err;
		var agency = "select * from packages";
		conn.query(agency, (err, result, fields) => {
			if (err) throw err;
			var today = moment();
			res.writeHead(200, {
				"content-type": "text/html"
			});
			res.write("<!DOCTYPE html><html><head><title>Vacation Packages</title></head><body>");
			res.write("<table border='1'>");
			res.write("<tr>");
			res.write("<td>Package Id</td>");
			res.write("<td>Package Name</td>");
			res.write("<td>Start Date</td>");
			res.write("<td>End Date</td>");
			res.write("<td>Package Description</td>");
			res.write("<td>Base Price</td>");
			res.write("</tr>");
			for (var i = 0; i < result.length; i++) {
				var today = moment().format("YYYY-MM-DD");
				var enddate = moment(result[i].PkgEndDate).format("YYYY-MM-DD");
				var startdate = moment(result[i].PkgStartDate).format("YYYY-MM-DD");
				if (today <= enddate) {
					res.write("<tr>");
					res.write("<td id='node" + i + "'>" + result[i].PackageId + "</td>");
					console.log("Package Id: ", result[i].PackageId);
					res.write("<td>" + result[i].PkgName + "</td>");
					if (today > startdate) {
						res.write("<td style='color:red;font-weight:bold'>" + result[i].PkgStartDate + "</td>");
					} else {
						res.write("<td>" + result[i].PkgStartDate + "</td>");
					}
					res.write("<td>" + result[i].PkgEndDate + "</td>");
					res.write("<td>" + result[i].PkgDesc + "</td>");
					res.write("<td>$" + result[i].PkgBasePrice + ".00</td>");
					res.write("<td><a href=order?pkgid=" + result[i].PackageId + "><button onclick>Make a booking</button></a></td>");

					res.write("</tr>");
				}
			}

			res.write("</table></body></html>");
			res.end();
		});


		conn.end((err) => {
			if (err) throw err;
		});
	});
});

//code to enter customer details into the customer table of travel agents database through the register form//
//Author: Sai Shalini Karaikatte Venugopal//
app.post("/senddata", (req, res) => {
	const conn = mysql.createConnection({
		host: "localhost",
		user: "Shalini",
		password: "password",
		database: "travelexperts",
		multipleStatements: true
	});

	conn.connect((err) => {
		if (err) throw err;
		var insertdata = "Insert into customers(CustFirstName,CustLastName,CustAddress,CustProv,CustPostal,CustCity,CustCountry,CustHomePhone,CustBusPhone,CustEmail,CustMark) values('" + req.body.fname + "','" + req.body.lname + "','" + req.body.address + "','" + req.body.prov + "','" + req.body.post + "','" + req.body.city + "','" + req.body.ctry + "','" + req.body.hphone + "','" + req.body.bphone + "','" + req.body.email + "','" + req.body.info + "')";
		conn.query(insertdata, (err, result, fields) => {
			if (err) throw err;
		});
		conn.end((err) => {
			if (err) throw err;
		});
	});
	res.send("You have been registered!");
});

//code to enter customer details into the customer table and create a corresponding booking record in the booking table of travel agents database through the order form//
//Author: Sai Shalini Karaikatte Venugopal//
app.post("/sendbkdata", (req, res) => {
	const conn = mysql.createConnection({
		host: "localhost",
		user: "Shalini",
		password: "password",
		database: "travelexperts",
		multipleStatements: true
	});

	conn.connect((err) => {
		if (err) throw err;
	});

	var insertdata = "Insert into customers(CustFirstName,CustLastName,CustAddress,CustProv,CustPostal,CustCity,CustCountry,CustHomePhone,CustBusPhone,CustEmail,CustMark) values('" + req.body.fname + "','" + req.body.lname + "','" + req.body.address + "','" + req.body.prov + "','" + req.body.post + "','" + req.body.city + "','" + req.body.ctry + "','" + req.body.hphone + "','" + req.body.bphone + "','" + req.body.email + "','" + req.body.info + "')";
	var bookingId = "";
	conn.query(insertdata, (err, result, fields) => {
		if (err) throw err;
		console.log("1 record inserted, ID: " + result.insertId);
		bookingId = result.insertId;
		var bookNo = "B12345";
		var today = moment().format("YYYY-MM-DD");
		insertdata = "Insert into bookings(CustomerId, PackageId, TravelerCount, TripTypeId, BookingDate, BookingNo) values('" + bookingId + "','" + req.body.pkgId + "','" + req.body.notrav + "','" + req.body.tt + "','" + today + "','" + bookNo + "')";
		conn.query(insertdata, (err, result, fields) => {
			if (err) throw err;
			console.log("1 record inserted in booking");
			conn.end((err) => {
				if (err) throw err;
			});
		});
	});
	res.send("YOUR BOOKING HAS BEEN CREATED!");
});

//Code to display error message when page is not found//	
app.use((req, res, next) => {
	res.status(404).sendFile(__dirname + "/views/404.html");
});