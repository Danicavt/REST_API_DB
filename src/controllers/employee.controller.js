import * as employeeServices from "../services/employee.service.js"

export const getEmployees = (req, res) => {
    employeeServices
        .getEmployees()
        .then((result) => {
            res.status(200).json({
                message: "Employees retrieved",
                data: result[0],
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

export const getEmployee = (req, res) => {
    const { id } = req.params;
    employeeServices
        .getEmployee(id)
        .then((result) => {
            res.status(200).json({
                message: "Employee retrieved",
                data: result[0],
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

export const createEmployee = (req, res) => {
    const employee = req.body;
    employeeServices
        .createEmployee(employee)
        .then((result) => {
            res.status(200).json({
                message: "Employee created",
                data: employee,
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

export const updateEmployee = (req, res) => {
    const { id } = req.params;
    const employee = req.body;
    employeeServices
        .updateEmployee(id, employee)
        .then((result) => {
            res.status(200).json({
                message: "Employee updated",
                data: employee,
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

export const deleteEmployee = (req, res) => {
    const { id } = req.params;
    employeeServices
        .deleteEmployee(id)
        .then((result) => {
            res.status(200).json({
                message: "Employee deleted"
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};