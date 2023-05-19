const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        if (!employees) return res.status(204).json({ message: 'No employees found.' });
        res.json(employees);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

const createNewEmployee = async (req, res) => {
    if (!req.body.firstName || !req.body.lastName) {
        return res.status(400).json({ message: "First and last names are required." })
    }
    try {
        const result = await Employee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

const updateEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: 'Employee ID'});
    try {
        const employee = await Employee.findById(req.params.id).exec();
        if (!employee) {
            return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
        }
        if (req.body.firstName) employee.firstName = req.body.firstName;
        if (req.body.lastName) employee.lastName = req.body.lastName;
        const result = await employee.save();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

const deleteEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: 'Employee ID'});
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
        }
        
        const result = await employee.deleteOne();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

const getEmployee = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ message: 'Employee ID'});
    try {
        const employee = await Employee.findById(req.params.id).exec();
        if (!employee) {
            return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
        }
        res.json(employee);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}