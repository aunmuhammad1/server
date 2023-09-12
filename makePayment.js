import mongoose from 'mongoose';

const makePaymentSchema = new mongoose.Schema({

    studentData: {
        type: Object,
        required: true
    },
    pending: {
        type: Boolean,
        required:true
    },
});


export default makePaymentSchema;
