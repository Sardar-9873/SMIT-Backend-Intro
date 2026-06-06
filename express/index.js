const express = require("express");
const bodyparser = require("body-parser");

const app = express();

app.use(bodyparser.json());

const students = [{ name: "Aaban", age: 15, id: 1 }];
let lastAddedID = 1;

app.post("/student", (req, res) => {

    const body = req.body;

    if (!body) {
        res.status(400).send({ "data": null, "message": "Body required for post." });
        return;
    }

    students.push({ ...body, id: ++lastAddedID });

    res.status(201).send({ "data": null, "message": "Student added succesfully." });
});

app.get("/student", (req, res) => {

    const id = Number(req.query.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        res.status(404).send({ "data": null, "message": "User not found." });
        return;
    }

    res.status(200).send({ "data": student, "message": "User successfully retrieved." })
});

app.delete("/student", (req, res) => {

    const id = Number(req.query.id);

    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
        res.status(404).send({ "data": null, "message": "User not found." });
        return;
    }

    students.splice(studentIndex, 1);

    res.status(200).send({ "data": null, "message": "User deleted successfully." });
});

app.put("/student", (req, res) => {

    const id = Number(req.query.id);

    const studentIndex = students.findIndex(s => s.id === id);

    if (studentIndex === -1) {
        res.status(404).send({ "data": null, "message": "User not found." });
        return;
    }

    const body = req.body;

    if (!body) {
        res.status(400).send({ "data": null, "message": "Body required for put." });
        return;
    }

    const updatedStudent = {
        ...body,
        id: id
    }

    students[studentIndex] = updatedStudent;

    res.status(200).send({ "data": null, "message": "Student updated succesfully." });


});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})