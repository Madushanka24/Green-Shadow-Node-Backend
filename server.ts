import express from "express";
import fieldRoutes from "./routes/field-routes";
import cropRoutes from "./routes/crop-routes";
import staffRoutes from "./routes/staff-routes";
import authRoutes, {authenticateToken} from "./routes/auth-routes";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",  // Allow frontend requests
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true
}));

app.use('/auth', authRoutes)

app.use(authenticateToken);

app.use('/field',fieldRoutes);
app.use('/crop',cropRoutes);
app.use('/staff',staffRoutes );


app.listen(3000, (err=>{
    console.log("Server running on port 3000");
}));

app.use('/health',(req,res,next)=>{
    res.status(200).send('API is functional');
})
