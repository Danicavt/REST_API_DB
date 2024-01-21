import { Router } from "express";
import path from "path";
import multer from "multer";
import csv from 'fast-csv'
import fs from 'fs'
import db from "../config/db.js";
import "../app.js";

import { getEmployees, getEmployee, getFirstRequirement, getSecondRequirement, createEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.controller.js"


//const fs = require ('fs')
const __dirname = path.resolve();

const employeeRouter = Router();

employeeRouter.get("/first-req", getFirstRequirement);

employeeRouter.get("/second-req", getSecondRequirement);

employeeRouter.get("/", getEmployees );

employeeRouter.get("/:id", getEmployee);

employeeRouter.post("/", createEmployee);

employeeRouter.put("/:id", updateEmployee);

employeeRouter.delete("/:id", deleteEmployee);




// multer config

let storage = multer.diskStorage({
    destination:(req, file, callback) =>{
        callback(null, "./uploads/");
    },
    filename:(req, file, callback) => {
        callback(null, file.originalname);
    }
});

//upload file
let upload = multer({
    storage:storage
});

employeeRouter.post('/import-csv/employees', upload.single('file'), (req,res) => {
    res.json(req.file);
    uploadCsv_emp(__dirname + "/uploads/" + req.file.filename);
    console.log(req.file.filename)
});

function uploadCsv_emp(path){
    let stream = fs.createReadStream(path)
    let csvDataColl = []
    const query = 'INSERT INTO hired_employees (id, name, datetime, department_id, job_id) VALUES ?;';
    let fileStream = csv
    .parse()
    .on('data', function(data){
        const parsedarray = data.map((value) => {
            return value || null
        })
        csvDataColl.push(parsedarray)
    })
    .on('end', function() {
        csvDataColl.unshift()
        db.query(query, [csvDataColl],(error, res) =>{
        })
    })
    stream.pipe(fileStream)
};

employeeRouter.post('/import-csv/departments', upload.single('file'), (req,res) => {
    res.json(req.file);
    uploadCsv_dep(__dirname + "/uploads/" + req.file.filename);
});

function uploadCsv_dep(path){
    let stream = fs.createReadStream(path)
    let csvDataColl = []
    const query = 'INSERT INTO departments (id, department) VALUES ?;';
    let fileStream = csv
    .parse()
    .on('data', function(data){
        const parsedarray = data.map((value) => {
            return value || null
        })
        csvDataColl.push(parsedarray)

    })
    .on('end', function() {
        csvDataColl.unshift()
        db.query(query, [csvDataColl],(error, res) =>{
        })
    })
    stream.pipe(fileStream)
};

employeeRouter.post('/import-csv/jobs', upload.single('file'), (req,res) => {
    res.json(req.file);
    uploadCsv_job(__dirname + "/uploads/" + req.file.filename);
});

function uploadCsv_job(path){
    let stream = fs.createReadStream(path)
    let csvDataColl = []
    const query = 'INSERT INTO jobs (id, job) VALUES ?;';
    let fileStream = csv
    .parse()
    .on('data', function(data){
        const parsedarray = data.map((value) => {
            return value || null
        })
        csvDataColl.push(parsedarray)

    })
    .on('end', function() {
        csvDataColl.unshift()
        db.query(query, [csvDataColl],(error, res) =>{
        })
    })
    stream.pipe(fileStream)
};


export default employeeRouter;
