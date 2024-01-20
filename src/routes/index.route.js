import { Router } from "express";
import employeeRouter from "./employee.route.js"

const indexRouter = Router();

//main
indexRouter.get("/", (req, res) => {
    res.send("Welcome to my DB");
});

//employees
indexRouter.use("/employee", employeeRouter)

export default indexRouter;