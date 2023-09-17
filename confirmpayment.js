import mongoose from 'mongoose';

const confirmPaymentSchema = new mongoose.Schema({

    studentData: {
        type: Object,
        required: true
    },
    prove: {
        type: String,
        required: true
    },
    access: {
        type: Boolean,
        required: true
    },
});


export default confirmPaymentSchema;
