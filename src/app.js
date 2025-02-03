const express = require("express");
const connectDB = require("./config/database");
const {adminAuth, userAuth} = require("./middleware/auth");
const app = express();
const User = require("./models/user");



app.post("/signup", async (req, res) => {
    const user = new User({
            firstName: "Sushil",
            lastName: "Babhulkar",
            emailId: "sushilbabhulkar@gmail.com",
            password: "sushil@123",
            age:34,
            gender: "Male"
        });
   
    try{
       await user.save();
       res.send("User Added Successfully!!");
   } catch(err) {
        res.status(400).send('User not added !!!'+ err.message);
   }
})

connectDB()
.then(() => {
    console.log("Database connected Sucessfully!!!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch((err) => {
    console.log("Database can not connected!!!");
})


app.use("/admin", adminAuth);
// app.use("/user", userAuth);

app.get("/admin/getAllData", (req, res) => {
    res.send("All user data!!!");
})

app.get("/admin/delete", (req, res) => {
    res.send("Deleted user data!!");
})


app.get("/user",userAuth, (req, res, next)=>{
    // res.send('response handler!!!');
    next();
},
(req, res, next)=> {
    // res.send("2nd response handler!!!");
    next();
},
(req, res)=> {
    res.send("3rd response handler!!!");
})

app.get("/user/login", (req, res)=>{
    console.log('req', req.query);
    try{
        // res.send('user loged in successfully');
        throw new Error('here is error');
    } catch(err) {
        // res.status(500).send(err.message);
        res.status(500).send('Some error  Contact support team!!!');
    }
})


//ROUTE WITH QUERY 
// http://localhost:3000/user?userId=101&password=admin@123
// app.get("/user",(req, res) => {
//     console.log(req.query);
//     res.send({firstName:"Shubhanm", lastName:"Babhulkar", ...req.query});
// })

//DYNAMIC ROUTE
// http://localhost:3000/user/101
app.get("/user/:userId",(req, res) => {
    console.log(req.params);
    res.send({firstName:"Shubhanm", lastName:"Babhulkar", ...req.params});
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
// app.use("/", (req, res) => {
//     res.send('Route is not match');
// })

// Below is the error handing alway alway keep at the bottom
app.use("/", (err, req, res, next) => {
    if(err) {
        res.status(500).send('Something went wrong!!!');
    }
})

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });