const express = require("express");

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hello from Q Software Book Management</h1>")
})

//Error handler must be last app.use!!
app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        message: 'Something broke! Please contact support.'
    })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})