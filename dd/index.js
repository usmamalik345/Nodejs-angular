// const express = require ('express')
// const bodyParser = require('body-parser')
// const mongoose = require('../backend/db.js')
// const routes = require("./routes.js")

// const app = express()
// app.use(bodyParser.json())

// app.use(cors({ origin: 'http://localhost:4200/' }))

// app.listen(3000 , ()=>{
  //     console.log("server started at port 3000")
  // })
  
  // app.use('/employees' ,routes )

const express = require("express");
const mongoose = require("mongoose");
const router = require("../dd/routes/route.js");
const cors = require('cors')
const Employee = require("./employes/Employes.js");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const ObjectId = require("mongoose").Types.ObjectId
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Replace the URL and the database name with your own values
const url = "mongodb://localhost:27017/mydatabase";

app.use(cors());
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(`Error connecting to database: ${err}`);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/employees", ((req, res) => {
  Employee.find((err , doc) => {
    if (err) {
      console.log(err, "This pot requst has error");
    } else {
      res.send(doc);
    }
  })
}))

app.get("/employees/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Employee.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log(err, "This pot requst has error");
      } else {
        res.send(doc);
      }
    } )
  } else {
      res.status(400).send(" No record found with id " + req.params.id)
  }
})

app.delete("/employees/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log(err, "This pot requst has error");
      } else {
        res.send(doc);
      }
    } )
  } else {
      res.status(400).send(" No record found with id " + req.params.id)
  }
})
app.put("/employees/:id", (req, res) => {

  if (ObjectId.isValid(req.params.id)) {

    let emp =  {
      name: req.body.name,
      postion: req.body.postion,
      depart: req.body.depart,
    };
    
    Employee.findByIdAndUpdate(req.params.id, {$set: emp} , {new: true} ,(err, doc) => {
      if (err) {
        console.log(err, "This pot requst has error");
      } else {
        res.send(doc);
      }
    } )
  } else {
      res.status(400).send(" No record found with id " + req.params.id)
  }
})

app.post("/employees", (req, res) => {
  let emp = new Employee({
    name: req.body.name,
    postion: req.body.postion,
    depart: req.body.depart,
  });
  emp.save((err, doc) => {
    if (err) {
      console.log(err, "This pot requst has error");
    } else {
      res.send(doc);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use("/employees", router);
