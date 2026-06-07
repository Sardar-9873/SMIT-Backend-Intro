const express = require("express");
const bodyparser = require("body-parser");
const { connectToDB, getDB } = require("./db");
const { ObjectId } = require("mongodb")


const app = express();

app.use(bodyparser.json());

// const students = [{ name: "Aaban", age: 15, id: 1 }];
// let lastAddedID = 1;



app.post("/student", async (req, res) => {

    const body = req.body;

    if (!body) {
        res.status(400).send({ "data": null, "message": "Body required for post." });
        return;
    }

    // students.push({ ...body, id: ++lastAddedID });
    await getDB().collection("students").insertOne(body);

    res.status(201).send({ "data": null, "message": "Student added succesfully." });
});

app.get("/student", async (req, res) => {

    const id = req.query.id;

    // const student = students.find(s => s.id === id);
    const student = await getDB().collection("students").findOne({ _id: new ObjectId(id) });

    if (!student) {
        res.status(404).send({ "data": null, "message": "Student not found." });
        return;
    }

    res.status(200).send({ "data": student, "message": "User successfully retrieved." })
});

app.delete("/student", async (req, res) => {

    const id = req.query.id;

    const objectId = new ObjectId(id);

    await getDB().collection("students").deleteOne({ _id: objectId});

    // const studentIndex = students.findIndex(s => s.id === id);


    // if (studentIndex === -1) {
    //     res.status(404).send({ "data": null, "message": "User not found." });
    //     return;
    // }

    // students.splice(studentIndex, 1);

    res.status(200).send({ "data": null, "message": "Student deleted successfully." });
});

app.put("/student", async (req, res) => {

    const id = req.query.id;

    const objectId = new ObjectId(id);

    // const studentIndex = students.findIndex(s => s.id === id);

    // if (studentIndex === -1) {
    //     res.status(404).send({ "data": null, "message": "User not found." });
    //     return;
    // }

    const body = req.body;

    if (!body) {
        res.status(400).send({ "data": null, "message": "Body required for put." });
        return;
    }

    await getDB().collection("students").updateOne({_id : objectId}, {$set: body});

    // const updatedStudent = {
    //     ...body,
    //     id: id
    // }

    // students[studentIndex] = updatedStudent;

    res.status(200).send({ "data": null, "message": "Student updated succesfully." });


});



const PORT = 5000;

connectToDB()
    .then(
        () => {
            console.log("Connected to Database.");
            app.listen(PORT, () => {
                console.log(`Server running on port: ${PORT}`);
            });
        }
    )
    .catch((error) => {
        console.error("Failed to connect to Database, server not started:", error);
    });
