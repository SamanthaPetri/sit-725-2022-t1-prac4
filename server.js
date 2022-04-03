require('dotenv').config()
var express = require("express")
var app = express()
var cors = require("cors")
const MongoClient = require("mongodb").MongoClient;
let projectCollection;

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//Database connection
const uri = "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@cluster0.d4rqo.mongodb.net/SIT725?retryWrites=true&w=majority" //uses env
const client = new MongoClient(uri, { useNewUrlParser: true })


const createColllection = (collectionName) => {
    client.connect((err, db) => {
        projectCollection = client.db().collection(collectionName);
        if (!err) {
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

    const insertProjects = (project, callback) => {
        projectCollection.insert(project, callback);
    }

    const getProjects = (callback) => {
        projectCollection.find({}).toArray(callback);
    }

    app.get('/api/projects', (req, res) => {
        getProjects((err, result) => {
            if (err) {
                res.json({ statusCode: 400, message: err })
            }
            else {
                res.json({ statusCode: 200, message: "Success", data: result })
            }
        })
    })

    app.post('/api/projects', (req, res) => {
        console.log("New Project added", req.body)
        var newProject = req.body;
        insertProjects(newProject, (err, result) => {
            if (err) {
                res.json({ statusCode: 400, message: err })
            }
            else {
                res.json({ statusCode: 200, message: "Project Successfully added", data: result })
            }
        })
    })

    var port = process.env.port || 3000;

    app.listen(port, () => {
        console.log("App listening to: " + port)
        createColllection("pets")
    })