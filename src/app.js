import express from "express";

const app = express()

app.set("port", process.env.PORT || 3000);

app.use("/", (req, res) => {
    res.send("Welcome to my DB")
}
);

app.listen(app.get("port"), () => {
    console.log("This server is running on port: ", app.get("port"));
}
);
