const express = require("express");
const connectDB = require("./config/database");
const {adminAuth, userAuth, jwtAuth} = require("./middleware/auth");
const app = express();
const User = require("./models/user");
// Middleware to parse JSON & Form Data
const validator = require('validator');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");

app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', profileRouter);

// app.post("/signup", async (req, res) => {
    
//     try{
//         validatedSignupData(req);
//         const { firstName, 
//             lastName, 
//             gender, 
//             age, 
//             emailId,
//             about,
//             photoUrl,
//             password} = req.body;
//         const passwordHash = await bcrypt.hash(password, 10);

//         const user = new User({
//             firstName, 
//             lastName, 
//             gender, 
//             age, 
//             emailId,
//             about,
//             photoUrl,
//             password: passwordHash
//         });
//         await user.save(user);
//         res.send("User Added Successfully!!");
//    } catch(err) {
//         res.status(400).send('ERROR : '+ err.message);
//    }
// })

// app.post('/login', async (req, res) => {
//     try{
//         const {emailId, password} = req.body;
//         if(!validator.isEmail(emailId)) {
//             throw new Error("Invalid Credentials");
//         }

//         const user = await User.findOne({emailId: emailId});

//         if(!user) {
//             throw new Error('User is not present in the Database');
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if(!isPasswordValid) {
//             throw new Error('Invalid Credentials')
//         } else {
//             const token = await jwt.sign({ _id: user._id }, 'Dev@Tinder@2025', {expiresIn: "0h"});
//             res.cookie("token", token);
//             // res.send({message:'User login Successfully', toke: token});
//             res.send('User login Successfully');

//         }

//     } catch(err) {
//         res.status(401).send('ERROR :' + err.message);
//     }
// })

// app.get("/profile", jwtAuth, async (req, res) => {
//     try {
//         const user = req.user; // user is set the middleware
//         if(user) {
//             res.send(user);
//         } else {
//             throw new Error('User not found.')
//         }
//     } catch(err) {
//         res.status(400).send("ERROR : " + err.message);
//     }
// })

// get data by emailId;
app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;
    console.log('userEmail', userEmail);
    try{
         const users = await User.find({emailId: userEmail});
         if(users.length === 0){
             res.status(404).send('User not found!!!');
        } else {
             res.send(users);
         }
    } catch(err) {
        res.status(400).send('Request Failed!!!' + err.message);
    }
})

// get all the users;
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({});
        if(user) {
            res.send(users);
        } else {
            res.status(404).send('User not found!!');
        }
    } catch {
        res.status(401).send('Something went wrong!!!');
    }
})

//findOne()
app.get("/oneuser", async (req, res) => {
    const userEmailId = req.body.emailId;
    try {
        const user = await User.findOne({emailId: userEmailId});
        if(user) {
            res.send(user); 
        } else {
            res.status(404).send('User not found!!');
        }
    } catch(err) {
        res.status(401).send('Something went wrong!!!');
    }
})

//findById()
app.get('/userById', async (req, res) => {
    const userId = req.body.id;
    try{
        const user = await User.findById(userId);
        if(user) {
            res.send(user);
        } else {
            res.status(404).send('User not found!!');
        }
    } catch(err) {
        res.status(401).send("Something went wrong!!!");
    }
})

//Update user
//here if you pass {returnDocument: "after"} as a 3rd orgument then it will retun updated data
// And if you pass {returnDocument: "before"} as a 3rd orgument then it will retun old data
app.patch('/user/:userId', async (req, res) => {
    const userData = req.body;
    const userId = req.params?.userId;
    try {
        const allowedFields = ["age", "gender", "about", "photoUrl", "skills"];
        const isUpdateAllowed = Object.keys(userData).every((k) => {
            return allowedFields.includes(k);
        })
        if(!isUpdateAllowed) {
            throw new Error("Updates not allowes!!");
        }
        if(userData?.skills.length > 10) {
            throw new Error ("Skills should not more than 10");
        }

        const userExists = await User.exists({_id: userId});
        if(userExists) {
            const updatedUser = await User.findByIdAndUpdate(userId, userData, {returnDocument: "after", runValidators: true});
            res.send(updatedUser);
        } else {
            res.status(404).send('User not updated.');
        }
    } catch(err) {
        res.status(401).send('Request failed!!'+err.message);
    }
})

//Delete user
app.delete("/user", async (req, res) => {
    const userId = req.body.id;
    try{
        const isUserExist = await User.exists({_id: userId});
        if(isUserExist) {
            await User.findByIdAndDelete(userId);
            res.send('User Deleted successfully.');
        } else {
            res.status(401).send('User not found.');
        }
    } catch(err) {
        res.status(400).send("Request Failed!!!");
    }
})

//Update data using EmailId
app.patch('/userbyEmail', async (req, res) => {
    const userData = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate({emailId: userData.emailId}, userData, {returnDocument: 'after'});
        res.send(updatedUser);
    } catch(err) {
        res.status(400).send("Request failed!!!");
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
    res.send("Patch the data successfully");
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