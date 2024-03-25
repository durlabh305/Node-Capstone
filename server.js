const express = require('express');
const mongoose = require('mongoose');

// telling to server to take route auth.js from routes folder
const authRoute = require("./routes/auth")
const jobRoute = require("./routes/job")

require('dotenv').config();
const app = express();
const PORT = 5000;
app.use(express.json())

console.log(process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log("DB Connected :)"))
.catch((error)  => console.log("DB failed to connect :("))

app.get("/api/health", (req, res) => {
    console.log("hey health")
    res.json ({
        service: "Backend joblisting server",
        status: "active",
        time: new Date()
    })
})

app.post("/api/v1/hi", (req, res) => {
    res.json({message: "hi"})
})

app.use("/api/v1/autho", authRoute)
console.log(authRoute)
app.use("/api/v1/job", jobRoute);

app.listen(PORT, () => {
    console.log(`Backend server running at port ${PORT}`)
})