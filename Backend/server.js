import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import hrRoutes from "./routes/hrRoutes.js";


dotenv.config();


const app = express();


app.use(cors());

app.use(express.json());


app.get("/",(req,res)=>{

    res.json({
        message:"LettersToHR API running"
    });

});


app.use("/api",hrRoutes);



const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});
