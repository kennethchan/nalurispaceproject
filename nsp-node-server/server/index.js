import cors from "cors";
import express from "express";
import calcpi from './functions/calcpi.js'

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

let currentPiValue = 0
let currentIteration = 1

setInterval(async () => {
    currentPiValue = await calcpi(currentIteration)
    currentIteration++
}, 1000);


app.get("/getCurrentPiVal", async (req, res) => {
    res.json({ message: currentPiValue });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

