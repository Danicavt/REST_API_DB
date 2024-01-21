import express from "express";
import db from "./config/db.js";
import indexRouter from "./routes/index.route.js";
import multer from "multer";
import path from "path";

const app = express();

app.set("port", process.env.PORT || 3000);

//middleware
app.use(express.json());

//routes
app.use("/", indexRouter);
app.use("*", (req, res) => {
    res.send("ERROR 404 - Page not found")
});


//start server
app.listen(app.get("port"), () => {
    console.log("This server is running on port: ", app.get("port"));
});


//connect to db
db.connect()
    .then(() => {
    console.log("Succesfully connected");
    })
    .catch((err) => {
        console.log("Error: ", err);
    });

   

