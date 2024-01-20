import { Router } from "express";

import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js"

const employeeRouter = Router();

employeeRouter.get("/", getEmployees );

employeeRouter.get("/:id", getEmployee);

employeeRouter.post("/", createEmployee);

employeeRouter.put("/:id", updateEmployee);

employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;
