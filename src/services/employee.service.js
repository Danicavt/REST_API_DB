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

export const getfirstRequirement = () => {
    return new Promise((resolve, reject) => {

        const query = 'SELECT a.department, b.job, \
        COUNT(CASE WHEN quarter(datetime) = 1 THEN 1 ELSE NULL END) AS Q1,\
        COUNT(CASE WHEN quarter(datetime) = 2 THEN 1 ELSE NULL END) AS Q2,\
        COUNT(CASE WHEN quarter(datetime) = 3 THEN 1 ELSE NULL END) AS Q3,\
        COUNT(CASE WHEN quarter(datetime) = 4 THEN 1 ELSE NULL END) AS Q4\
        from  hired_employees c \
        join departments a\
        on c.department_id = a.id \
        join jobs b\
        on b.id = c.job_id\
        where c.datetime like "%2021%"\
        group by a.department, b.job\
        order by a.department, b.job;';
        
        db.execute(query)
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};

export const getSecondRequirement = () => {
    return new Promise((resolve, reject) => {

        const query = 'SELECT e.department_id,  d.department, COUNT(1) AS hired\
        FROM hired_employees e \
        join departments d\
        on e.department_id = d.id\
        GROUP BY e.department_id,  d.department\
        HAVING COUNT(1) >\
            (\
                SELECT AVG(count) \
                FROM (\
                    SELECT e.department_id,  d.department,\
                    COUNT(1) AS count\
                    FROM hired_employees e \
                    join departments d\
                    on e.department_id = d.id\
                    where e.datetime like "%2021%"\
                    GROUP BY e.department_id,  d.department\
                ) a\
            )\
        order by hired desc;';
        
        db.execute(query)
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

