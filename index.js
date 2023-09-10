import express from 'express';
const app = express();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import student from './student.js';

const Student = mongoose.model('Student', student);

app.use(bodyParser.json());


const mongooseurl = 'mongodb+srv://physicsbook:VyjXsryB2p8VRrgX@cluster0.pjsmtiy.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(mongooseurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Connected to mongo");
});

mongoose.connection.on('error', (err) => {
    console.log("Error connecting", err);
});

app.get('/', (req, res) => {
    res.send('Hello World');
    res.end();
    }
);

// add code check for existing email

app.get('/get-data', (req, res) => {
    Student.find({}).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
}
);


app.post('/send-data', (req, res) => {
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        year: req.body.year,
        password: req.body.password,
        phone: req.body.phone,
        date: req.body.data
    })
    student.save()
        .then(data => {
            console.log(data)
            res.send("Success")
        }).catch(err => {
            console.log(err)
        })
    // res.send("Success");
}, (error) => {
    console.log(error);
});

app.post('/login', (req, res) => {
    Student.find({
        email: req.body.email,
        password: req.body.password
    })
        .then(data => {
            console.log(data)
            if (data.length === 0) {
                res.send("Invalid")
            }
            else {
                res.send("Success")
            }
        }).catch(err => {
            console.log(err)
        })
}
);

app.post('/update', (req, res) => {
    Student.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email,
        year: req.body.year,
        password: req.body.password,
        phone: req.body.phone,
    })
        .then(data => {
            console.log(data)
            res.send("Success")
        }).catch(err => {
            console.log(err)
        })
}
);

app.post('/delete', (req, res) => {
    Student.findByIdAndRemove(req.body.id)
        .then(data => {
            console.log(data)
            res.send("Success")
        }).catch(err => {
            console.log(err)
        })
}
);


app.listen(9000, () => {
    console.log("Server running on port 9000");
    }
);