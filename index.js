// const http = require("http");

// const students = [{ name: "Aaban", age: 15, id: 1 }];
// let lastAddedID = 1;

// const server = http.createServer((req, res) => {

//     // ===================== POST =====================
//     if (req.url === "/student" && req.method === "POST") {

//         let data = "";

//         req.on("data", chunk => {
//             data += chunk;
//         });

//         req.on("end", () => {
//             const body = JSON.parse(data);

//             const newStudent = {
//                 ...body,
//                 id: ++lastAddedID
//             };

//             students.push(newStudent);

//             res.writeHead(201, {
//                 "Content-Type": "application/json"
//             });

//             return res.end(JSON.stringify({
//                 Info: "Student Created",
//                 student: newStudent
//             }));
//         });

//         return;
//     }

//     // ===================== GET =====================
//     if (req.url.startsWith("/student") && req.method === "GET") {

//         const id = req.url.split("=")[1];

//         const student = students.find(s => s.id === Number(id));

//         if (!student) {
//             res.writeHead(404, {
//                 "Content-Type": "application/json"
//             });

//             return res.end(JSON.stringify({
//                 Info: "Student Not Found"
//             }));
//         }

//         res.writeHead(200, {
//             "Content-Type": "application/json"
//         });

//         return res.end(JSON.stringify(student));
//     }

//     // ===================== Get ========================
//     if (req.url.startsWith("/student") && req.method === "GET") {

//         const id = req.url.split("=")[1];


//         // if no id provided
//         if (!id) {
//             res.writeHead(400, {
//                 "Content-Type": "application/json"
//             });

//             return res.end(JSON.stringify({
//                 Info: "ID is required"
//             }));
//         }

//         const student = students.find(s => s.id === Number(id));

//         if (!student) {
//             res.writeHead(404, {
//                 "Content-Type": "application/json"
//             });

//             return res.end(JSON.stringify({
//                 Info: "Student Not Found"
//             }));
//         }

//         res.writeHead(200, {
//             "Content-Type": "application/json"
//         });

//         return res.end(JSON.stringify(student));
//     }

//     // ===================== DELETE =====================
//     if (req.url.startsWith("/student") && req.method === "DELETE") {

//         const id = req.url.split("=")[1];

//         const studentIndex = students.findIndex(s => s.id === Number(id));

//         if (studentIndex === -1) {
//             res.writeHead(404, {
//                 "Content-Type": "application/json"
//             });

//             return res.end(JSON.stringify({
//                 Info: "Student Not Found"
//             }));
//         }

//         const deleted = students.splice(studentIndex, 1);

//         res.writeHead(200, {
//             "Content-Type": "application/json"
//         });

//         return res.end(JSON.stringify({
//             Info: "Student Deleted",
//             student: deleted[0]
//         }));
//     }

//     // ===================== PUT =====================
//     if (req.url.startsWith("/student") && req.method === "PUT") {

//         const id = req.url.split("=")[1];

//         const studentIndex = students.findIndex(s => s.id === Number(id));

//         if (studentIndex === -1) {
//             res.writeHead(404, {
//                 "Content-Type": "application/json"
//             });

//             return res.end(JSON.stringify({
//                 Info: "Student Not Found"
//             }));
//         }

//         let data = "";

//         req.on("data", chunk => {
//             data += chunk;
//         });

//         req.on("end", () => {
//             const body = JSON.parse(data);

//             students[studentIndex] = {
//                 ...body,
//                 id: Number(id)
//             };

//             res.writeHead(200, {
//                 "Content-Type": "application/json"
//             });

//             return res.end(JSON.stringify({
//                 Info: "Student Updated",
//                 student: students[studentIndex]
//             }));
//         });

//         return;
//     }

//     // ===================== DEFAULT =====================
//     res.writeHead(404, {
//         "Content-Type": "application/json"
//     });

//     res.end(JSON.stringify({
//         Info: "Route Not Found"
//     }));
// });

// server.listen(5000, () => {
//     console.log("Server running on port 5000");
// });