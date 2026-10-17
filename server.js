import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRouts.js';
import sellerRouter from './routes/sellerRouts.js';
import cartRouter from './routes/cartRouts.js';
import productRouter from './routes/productRouts.js';
import addressRouter from './routes/addressRouts.js';
import orderRouter from './routes/orderRouts.js';
import newsletterRouter from './routes/newsletterRoutes.js';
import appointmentRouter from './routes/appointmentRoutes.js';


const app = express();
const port = process.env.PORT || 4000;

await connectDB();

// Allow multiple origins
const allowedOrigins = ['http://localhost:5172','http://localhost:5173'];

//middlewae config
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => res.send('API is working'));
app.use('/api/user',userRouter);
app.use('/api/seller',sellerRouter);
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter);
app.use('/api/address',addressRouter);
app.use('/api/order',orderRouter);
app.use('/api/newsletter',newsletterRouter);
app.use('/api/appointment',appointmentRouter);





// Start Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
