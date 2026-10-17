import Appointment from "../models/Appointment.js";

// Book appointment
export const bookAppointment = async (req, res) => {
    try {
        const { petName, ownerName, phone, email, date, time, service, message } = req.body;

        const appointment = new Appointment({
            petName,
            ownerName,
            phone,
            email,
            date,
            time,
            service,
            message
        });

        await appointment.save();
        res.json({ success: true, message: 'Appointment booked successfully' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Get all appointments (for seller dashboard)
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await Appointment.findByIdAndUpdate(id, { status });
        res.json({ success: true, message: 'Appointment status updated' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};