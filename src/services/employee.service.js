import db from "../config/db.js";
import "../app.js";

export const getEmployees = () => {
    return new Promise((resolve, reject) => {

        const query = 'SELECT * FROM hired_employees';
        
        db.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));

    });

};

export const getEmployee = (id) => {
    return new Promise((resolve, reject) => {

        const query = 'SELECT * FROM hired_employees WHERE id = ?';
        
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));

    });

};

export const createEmployee = (employee) => {
    return new Promise((resolve, reject) => {

        const query = 'INSERT INTO hired_employees (id, name, datetime, department_id, job_id) VALUES (?, ?, ?, ?, ?)';

        const {id, name, datetime, department_id, job_id} = employee;
        
        db.execute(query, [id, name, datetime, department_id, job_id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));

    });
};

export const updateEmployee = (id, employee) => {
    return new Promise((resolve, reject) => {

        const query = 
        'UPDATE hired_employees SET name = ?, datetime = ?, department_id = ?, job_id = ? WHERE id = ?';

        const {name, datetime, department_id, job_id} = employee;
        
        db.execute(query, [name, datetime, department_id, job_id, id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));

    });
};

export const deleteEmployee = (id) => {
    return new Promise((resolve, reject) => {

        const query = 
        'DELETE FROM hired_employees WHERE id = ?';
        
        db.execute(query, [id])
            .then((result) => resolve(result))
            .catch((err) => reject(err));

    });
};

/*export const uploadEmployee = (employee) => {
    return new Promise((resolve, reject) => {
        
        const query = 'INSERT INTO hired_employees (id, name, datetime, department_id, job_id) VALUES ?';
 
        let upload = multer({
            storage:storage
        });

    });
};*/