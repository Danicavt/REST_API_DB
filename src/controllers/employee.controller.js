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
                message: "Employee re",
                data: result[0],
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

export const getFirstRequirement = (req, res) => {
    employeeServices
        .getfirstRequirement()
        .then((result) => {
            res.status(200).json({
                message: "Number of employees hired for each job and department in 2021 divided by quarter",
                data: result[0],
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        });
    
};

export const getSecondRequirement = (req, res) => {
    employeeServices
        .getSecondRequirement()
        .then((result) => {
            res.status(200).json({
                message: " List of ids, name and number of employees hired of each department that hired more employees than the mean of employees hired in 2021 for all the departments, ordered by the number of employees hired (descending)",
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

