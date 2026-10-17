import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    petName: { type: String, required: true },
    ownerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);

export default Appointment;