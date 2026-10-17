import express from "express";
import { bookAppointment, getAllAppointments, updateAppointmentStatus } from "../controllers/appointmentController.js";
import authSeller from "../middlewares/authSeller.js";

const appointmentRouter = express.Router();

appointmentRouter.post('/book', bookAppointment);
appointmentRouter.get('/list', authSeller, getAllAppointments);
appointmentRouter.put('/update/:id', authSeller, updateAppointmentStatus);

export default appointmentRouter;