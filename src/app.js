const express = require("express");
const app = express();


app.get("/user",(req, res) => {
    res.send({firstName:"Shubhanm", lastName:"Babhulkar"});
})

app.post("/user",(req, res) => {
    //Your data saving logic should be here
    res.send({message: "Data Save Successfully", status: true});
})

app.delete("/user",(req, res) => {
    res.send("User data deleted Successfully");
})

app.put("/user",(req, res) => {
    res.send("Put the Data Successfully")
})

app.patch("/user", (req, res) => {
    res.send("Path the data successfully");
})


// app.use("/hi",(req, res) => {
//     res.send('Hi Hi Hi Hi');
// })

// app.get("/hello",(req, res) => {
//     res.send('hello hello hello hello');
// })
// app.use("/hello/shubham",(req, res) => {
//     res.send('hello Shubham');
// })


// app.use("/data",(req, res) => {
//     res.send('Hi From the Shubham');
// })

// app.use((req, res) => {
//     res.send('Namaste Node from server');
// })

//Wild card route go in side below route when route not match with any
app.use("/", (req, res) => {
    res.send('Route is not match');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});