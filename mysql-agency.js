const mysql = require("mysql");
const express = require("express");
const app = express();

app.listen(8000, (err)=>{
	if (err) throw err;
	console.log("server started");
});

app.get("/getagents", (req,res)=>{
	const conn = mysql.createConnection({
		host: "localhost",
		user: "dave",
		password: "12345",
		database: "travelexperts",
		multipleStatements: true
	});
	
	conn.connect((err)=>{
		if (err) throw err;
		var agency = "select A.*, B.* from agencies A, agents B";
		conn.query(agency, (err, result, fields)=>{
			if (err) throw err;
			res.writeHead(200, { "content-type": "text/html" });
			res.write("<!DOCTYPE html><html><head><title>All Agencies</title></head><body>");
			res.write("<table border='1'>");
			res.write("<tr>");
			res.write("<td>" + result[0].AgencyId + "</td>");
			res.write("<td>" + result[0].AgncyAddress + "</td>");
			res.write("<td>" + result[0].AgncyCity + "</td>");
			res.write("<td>" + result[0].AgncyPhone + "</td>");
			res.write("</tr>");
			res.write("<tr>");
			res.write("<td>Agent Id</td>");
			res.write("<td>First Name</td>");
			res.write("<td>Last Name</td>");
			res.write("<td>Phone</td>");
			res.write("<td>Email</td>");
			res.write("</tr>");
			for (var i = 0; i<result.length;i++)
			{
				if((result[i].AgencyId ==1)&&(i%2==0)){
				res.write("<tr>");
				res.write("<td id='node"+i+"'>" + result[i].AgentId + "</td>");
				res.write("<td>" + result[i].AgtFirstName + "</td>");
				res.write("<td>" + result[i].AgtLastName + "</td>");
				res.write("<td>" + result[i].AgtBusPhone + "</td>");
				res.write("<td>" + result[i].AgtEmail + "</td>");
				res.write("</tr>");
				}
			}
			res.write("</table><br />");

	res.write("<table border='1'>");
			res.write("<tr>");
			res.write("<td>" + result[9].AgencyId + "</td>");
			res.write("<td>" + result[9].AgncyAddress + "</td>");
			res.write("<td>" + result[9].AgncyCity + "</td>");
			res.write("<td>" + result[9].AgncyPhone + "</td>");
			res.write("</tr>");
			res.write("<tr>");
			res.write("<td>Agent Id</td>");
			res.write("<td>First Name</td>");
			res.write("<td>Last Name</td>");
			res.write("<td>Phone</td>");
			res.write("<td>Email</td>");
			res.write("</tr>");
			for (var i = 0; i<result.length;i++)
			{
				if((result[i].AgencyId ==2)&&(i%2==0)){
				console.log(result[i]);
				res.write("<tr>");
				res.write("<td id='node"+i+"'>" + result[i].AgentId + "</td>");
				res.write("<td>" + result[i].AgtFirstName + "</td>");
				res.write("<td>" + result[i].AgtLastName + "</td>");
				res.write("<td>" + result[i].AgtBusPhone + "</td>");
				res.write("<td>" + result[i].AgtEmail + "</td>");
				res.write("</tr>");
				}
			}
			res.write("</table></body></html>");
			console.log(result);
			res.end();
		});
		

	
		
		conn.end((err) => { 
			if (err) throw err; 
		});
	});
});