import express from 'express';
import fieldRoutes from "./routes/field-routes";
import cropRoutes from "./routes/crop-routes";
import staffRoutes from "./routes/staff-routes";

const app = express();

app.use(express.json());

app.use('/',  (req, res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use('/field',fieldRoutes);
app.use('/crop',cropRoutes);
app.use('/staff',staffRoutes );

app.listen(3000, (err=>{
    console.log("Server running on port 3000");
}));

app.use('/health',(req,res,next)=>{
    res.status(200).send('API is functional');
})

app.use('/',(req,res,next)=>{
    res.status(200).send('Not Found');
})
