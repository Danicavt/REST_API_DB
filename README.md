# REST_API_DB


## Table of contents

### TOOLS
- MySQL DB
[url](https://app.planetscale.com/danicapvt/dbtest)
- Js 
- NodeJs
- Postman
- IDE VSCode


### Section 1: API
In the context of a DB migration with 3 different tables (departments, jobs, employees) , create
a local REST API that must:
1. Receive historical data from CSV files
2. Upload these files to the new DB
3. Be able to insert batch transactions (1 up to 1000 rows) with one reques
[endpoint1](http://localhost:3000/employee/import-csv/employees)
[endpoint2](http://localhost:3000/employee/import-csv/departments)
[endpoint3](http://localhost:3000/employee/import-csv/jobs)

**Note:** Also there's a simple CRUD with respective endpoints to test with db.



### Section 2: SQL
-  Number of employees hired for each job and department in 2021 divided by quarter. The
table must be ordered alphabetically by department and job.

[endpoint](http://localhost:3000/employee/first-req)

```sql
SELECT a.department, b.job, 
        COUNT(CASE WHEN quarter(datetime) = 1 THEN 1 ELSE NULL END) AS Q1,
        COUNT(CASE WHEN quarter(datetime) = 2 THEN 1 ELSE NULL END) AS Q2,
        COUNT(CASE WHEN quarter(datetime) = 3 THEN 1 ELSE NULL END) AS Q3,
        COUNT(CASE WHEN quarter(datetime) = 4 THEN 1 ELSE NULL END) AS Q4
        from  hired_employees c 
        join departments a
        on c.department_id = a.id 
        join jobs b
        on b.id = c.job_id
        where c.datetime like "%2021%"
        group by a.department, b.job
        order by a.department, b.job;
```

- List of ids, name and number of employees hired of each department that hired more
employees than the mean of employees hired in 2021 for all the departments, ordered
by the number of employees hired (descending).

[endpoint](http://localhost:3000/employee/second-req)

```sql
SELECT e.department_id,  d.department, COUNT(1) AS hired
        FROM hired_employees e 
        join departments d
        on e.department_id = d.id
        GROUP BY e.department_id,  d.department
        HAVING COUNT(1) >
            (
                SELECT AVG(count) 
                FROM (
                    SELECT e.department_id,  d.department,
                    COUNT(1) AS count
                    FROM hired_employees e 
                    join departments d
                    on e.department_id = d.id
                    where e.datetime like "%2021%"
                    GROUP BY e.department_id,  d.department
                ) a
            )\
        order by hired desc;
```

