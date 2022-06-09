import cors from "cors";
import express from "express";
import calcpi from './functions/calcpi.js'

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

//Holds current value of Pi
let currentPiValue = 0

//Holds current iteration value
let currentIteration = 1

//Interval for calculating Pi value and updating iteration value
setInterval(() => {
    currentPiValue = calcpi(currentIteration)
    currentIteration++
}, 1500);

//Get API request
app.get("/getCurrentPiVal", async (req, res) => {
    res.json({ message: currentPiValue });
});

//Sets listener port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

