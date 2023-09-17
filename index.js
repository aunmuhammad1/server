import express from 'express';
const app = express();
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import student from './student.js';
import makePayment from './makePayment.js';
import confirmPayment from './confirmpayment.js';

const Student = mongoose.model('Student', student);
const MakePayment = mongoose.model('MakePayment', makePayment);
const ConfirmPayment = mongoose.model('ConfirmPayment', confirmPayment);

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

app.post('/make-payment', (req, res) => {
    const makePayment = new MakePayment({
        studentData: req.body.studentData,
        pending: req.body.pending,
    })
    makePayment.save()
        .then(data => {
            console.log(data)
            res.send("Success")
        }).catch(err => {
            console.log(err)
        })
    // res.send("Success");
});

app.put('/update-payment', (req, res) => {
    const id = req.body.email;
    MakePayment.findOneAndUpdate(
        { "studentData.email": id },
        { $set: { pending: false } },
        { new: true }
    ).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
});

app.get('/check-payment', (req, res) => {
    MakePayment.find({}).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
});

app.get('/get-data', (req, res) => {
    Student.find({}).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
});

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

app.post('/confirm-payment', (req, res) => {
    const confirmPayment = new ConfirmPayment({
        studentData: req.body.studentData,
        prove: req.body.prove,
        access: req.body.access,
    })
    confirmPayment.save()
        .then(data => {
            console.log(data)
            res.send("Success")
        }).catch(err => {
            console.log(err)
        })
    // res.send("Success");
});

app.get('/get-confirm-payment', (req, res) => {
    ConfirmPayment.find({}).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
});

app.listen(9000, () => {
    console.log("Server running on port 9000");
    }
);