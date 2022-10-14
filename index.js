require("dotenv").config();
// const bcrypt = require("bcrypt")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser");
const Registration = require("./models/Registration");
const Studentlist = require("./models/Studentlist");
const Courses = require("./models/Courses");
const Attendancelist = require("./models/Attendancelist");
const app = express();
//app = express().use(express.static(__dirname + '/'))
const port = 5000;
// const saltRounds = 10;  
const session = require("express-session")
const passport = require("passport")
// const passportLocalMongoose = require("passport-local-mongoose")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use( express.static( "public" ) );

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(Registration.createStrategy());

passport.serializeUser(Registration.serializeUser());
passport.deserializeUser(Registration.deserializeUser());
//DB connection
mongoose.connect( "mongodb+srv://admin:andrewfometsi@cluster0.n8hbru4.mongodb.net/?retryWrites=true&w=majority", 
  {
      useUnifiedTopology: true,
      useNewUrlParser:true
  },
  () => console.log("Connected to Db"))
  
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("signup"); 
});


app.post('/student2',async (req,res) => {
  const stid = req.body.studentid2
  
  try{ 
      await Studentlist.deleteOne({student_id:stid})
      res.status(200).redirect("student")
  }catch(e){
      res.status(400).send(e)
  }
})

app.post("/student3",  async (req,res) => {
  console.log(req.body)

  const student = {
      firstname: req.body.firstname,
      lastname: req.body.lastname}
      
      
  const filter ={ student_id: req.body.student_id}   
  
  
  try{
      const updatedStudent = await Studentlist.updateOne(filter,student,{ new: true })
      res.status(204).redirect("student")

  }catch(e){
      res.status(400).send(e)
  }

})



app.get("/student", (req, res) => {
  Studentlist.find({}, (err, students112) => {
    res.render("student", {students112});
    if (err){  
      console.log(err) 
    }
  }) 

  
});
app.get("/attendance", (req, res) => {

  Attendancelist.find({}, (err, attendance112) => {
    res.render("attendance", {allattendancelist:attendance112});
    if (err){
      console.log(err)
    } 
  })
  res.render("attendance"); 
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/class", (req, res)  =>{
  Courses.find({}, (err, course23) => {
    res.render("class", {allassignedcourses:course23});
    
  })
}); 
app.post("/delCourse",  async (req,res) => {
  const ccode = req.body.coursecode2
  
  try{ 
      await Courses.deleteOne({courseCode:ccode})
      res.status(201).redirect("class")
  }catch(e){
      res.status(400).send(e)
  }
})
app.post("/addclass", async (req, res) => {
  try {console.log(req.body)
    var courseCode =req.body.coursecode;
    var courseName = req.body.coursename;

    const course = new Courses ({
      courseCode:courseCode,
    courseName:courseName
    })
    const savedCourses = await course.save()
    res.status(201).redirect("class")
  } catch (error) {
    res.status(400).send(error)
  }
}); 
app.get("/reports", (req, res) => {
  Courses.find({}, (err, course23) => {
    res.render("reports", {assignedcourses:course23});

  })
  
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req,res)=>{
  res.logout();
  res.redirect("login");
})

app.post("/signup1", async (req, res) => {
  password = req.body.psw
Registration.register({  
   email: req.body.email,
          lecturer_id: req.body.lecturer_id, 
           department: req.body.department,
          password:password
        }, req.body.psw , function(err,user) {
      if (err){
        console.log(err)
        res.redirect("signup")
      }else{
        passport.authenticate("local")(req,res,function(){
          res.redirect("home")
        })
      }
}) 

//   bcrypt.hash(req.body.psw, saltRounds, function(err, hash) {
//     try { var email = req.body.email;
//       var lecturer_id = req.body.lecturer_id;
//       var password = hash;
      
//       const registration = new Registration ({
//         _id: mongoose.Types.ObjectId(),
//         email: req.body.email,
//         lecturer_id: lecturer_id,
//         password: password,
//         department: req.body.department
  
        
//       }) 
//        const savedBlog =  registration.save()
//       res.status(201).redirect("login")
//     } catch(e){
//       res.status(400).send(e)
//   }
    
    
// });
  
  
});
app.post("/student1", async (req, res,next) => {
  try { var fname = req.body.fname;
    var lname = req.body.lname;
    var student_id = req.body.id;
    var course = req.body.Course;
    
    const studentlist = new Studentlist ({
      _id: mongoose.Types.ObjectId(),
       student_id: student_id,
     firstname :fname,
     lastname: lname,
     course :req.body.Course
      // email: "asa@gmail.com",
      // lecturer_id: 23421,
      // password: "password",
     
    }) 
     const savedBlog = await studentlist.save()
    res.status(201).redirect("student")
   next()
  } catch(e){
    res.status(400).send(e)
}
  
 
  
});
app.post("/login1", async (req, res) => {
  const username = req.body.lecturer_id
  const  password  = req.body.pasw

//   try{
//      Registration.findOne({lecturer_id:username}, function(err,founduser){
//     if (err){
//       console.log(err)
//     }else {
//       if(founduser) {
//         bcrypt.compare(password,founduser.password,function(err,result){
//           if (result == true){
//             res.status(200).render("home",{username})
//           }
//         })
//       } else{
//         res.status(401).json({
//                 message: "Login not successful",
//                 error: "User not found",
                
//               })
//       }
//     }
//   })
//   } catch(e){
//     res.status(400).send(e)
// }

  // Check if username and password is provided
  // if (!username || !password) {
  // try {
  //   console.log(password)
  //   const registration = await Registration.findOne({ lecturer_id:username, password:req.body.pasw })
  //   bcrypt.compare(password, registration.password, function(err, result) {
  //      result == true
  //      console.log(registration.password)
  // }); 
  //   if (!registration) {
  //     res.status(401).json({
  //       message: "Login not successful",
  //       error: "User not found",
  //     })
  //   } else {
  //     res.status(200).render("home",{username})
      
  //   }
  //   next();
  // } catch (error) {
  //   res.status(400).json({
  //     message: "An error occurred",
  //     error: error.message,
  //   })
  // } 

  //   return res.status(400).json({
  //     message: "Username or Password not present",
  //   })

  // }

});
app.get("/home", (req, res) => {
if(req.isAuthenticated()){
  res.render("home");
} else{
  res.redirect("login")
}
  
});



// app.get('/',(req,res) =>{
//         res.render(__dirname + "/"+ "sidebar.html")
//         })
app.listen(port, function (error) {
  if (error) {
    console.log("Server error", error);
  } else {
    console.log("Listening on port " + port);
  }
});
