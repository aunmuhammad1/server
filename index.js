import Express from "express";

const app = new Express();
const port = 9000;


app.use('/', (req, res) => res.json({message: "Hello World"}))

app.listen(9000, () => {
    console.log("Server running on port 9000");
    }
);