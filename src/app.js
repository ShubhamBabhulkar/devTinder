const express = require("express");

const app = express();
app.use("/hi",(req, res) => {
    res.send('Hi Hi Hi Hi');
})
app.use("/hello",(req, res) => {
    res.send('hello hello hello hello 12355');
})
app.use("/data",(req, res) => {
    res.send('Hi From the Shubham');
})
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});