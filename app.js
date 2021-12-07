const express = require('express');
const path = require('path');
const app = express();

const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/gymdb');
}

const hostname = '127.0.0.1';
const port = 80;

app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use(express.static('static'));

app.get('/', (req,res)=>{
    res.render("Home", {title:"Fitness Zone"});
})

app.get('/aboutus', (req,res)=>{
    res.render("aboutus", {title:"Fitness Zone/About Us"});
})

app.get('/register', (req,res)=>{
    res.render("register", {title:"Fitness Zone/Register"});
})

app.get('/schedules', (req,res)=>{
    res.render("schedules", {title:"Fitness Zone/Schedules"});
})

const gymSchema = new mongoose.Schema({
    name: String,
    telephone: Number,
    email: String,
    age: Number,
    gender: String,
    dob: String,
    about: String
});

const gymStudent = mongoose.model('gymStudent', gymSchema);

app.post('/register', (req,res)=>{
    var student = new gymStudent(req.body);
    student.save().then(()=>{
        res.send("Thanks for registering in FitnessZone.We will soon contact you via E-mail");
    }).catch(()=>{
        res.send("Sorry, we are not able to register you at Fitness Zone. Please try after some time");
    });
})

app.listen(port, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})
