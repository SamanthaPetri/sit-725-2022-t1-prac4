var express = require('express');
var app = express();
var port = process.env.port || 3000;

const addNumbers = (number1, number2) => {
    var num1 = parseInt(number1)
    var num2 = parseInt(number2)
    var result = num1 + num2;
    return result
}

app.get("/addTwoNumbers", (req, res) => {
    var number1 = req.query.number1;
    var number2 = req.query.number2;
    var result = addNumbers(number1, number2);
    res.json({ statusCode: 200, data: result, message: "success" })
})

//experimenting with post code
/*app.post("/user/create", (req, res) => {
    let userData = {}
    userData.name = req.body.name;
    userData.age = req.body.age;
    userData.phone = req.body.phone;
    users.push(userData);
    res.json({ statusCode: 200, data: userData, message: "created" })
})

app.get("/user", (req, res) => {
    res.json({ statusCode: 200, data: users, message: "sucess" })
})*/

app.listen(port, () => {
    console.log("App listening to port " + port)
})