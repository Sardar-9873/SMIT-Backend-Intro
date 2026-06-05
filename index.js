const http = require("http");

const students = [{ name: "Aaban", age: 15, id: 1 }];
let lastAddedID = 1;

const server = http.createServer((req, res) => {
    if (req.url === "/student" && req.method === "POST") {

        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const body = JSON.parse(data);

            students.push({
                ...body,
                id: ++lastAddedID
            });

            // console.log(students);

            res.writeHead(202, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                id: lastAddedID
            }));

            // console.log(body);
        });
    }

    if (req.url.includes("/student") && req.method === "GET") {
        
        const id = req.url.split("=")[1];

        const student = id.find(u => u.id === Number(id));

        if (user) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            }
            );
        }

        res.end(JSON.stringify({
            user
        }));
    }
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});