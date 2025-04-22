const express = require('express');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter')

const app = express();

// midlewares
app.use(express.json());


// routes
app.use("/users",userRouter)
app.use("/auth",authRouter)


app.get("/", (req, res) => {
    res.json({
        message: "Welcome to basic mongoDB API"
    })
})

module.exports = app;

