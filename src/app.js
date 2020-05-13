require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//Init app
const app = express();
const port = process.env.SERVER_PORT || 3000;

//Middlewares
app.use(bodyParser.json());

const courses = [
    {id:1, name:"Reactjs"},
    {id:2, name:"Angularjs"},
    {id:3, name:"Nodejs"},
    {id:4, name:"VueJs"}
]

app.get("/api/courses",(req,res)=>{
   res.json(courses);
});

app.get('/api/courses/:id',(req,res)=>{
   const course = courses.find(course => course.id === parseInt(req.params.id));
   if(!course) return res.status(404).send("Course not found");
   res.json(course);
})

app.post('/api/courses/',(req,res)=>{
    if(!req.body.name || req.body.name.length < 3) return res.sendStatus(400);
    const {id,name} = req.body;
    courses.push({id,name});
    res.status(201).send("Course added");
});

app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found");
    course.name = req.body.name;
    res.json({course});
})

app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(course => course.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("Course not found");
    const index = courses.indexOf(course);
    courses.splice(index,1);
    res.json(course);
});

app.listen(port,()=>{
    console.log(`Server is up and Running on port ${port}`);
})



