/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

//Gives the name of files present in the directory
app.get("/files", (req, res) => {
  fs.readdir(path.join(__dirname, "./files/"), (err, files) => {
    if (err) {
      return res.status(500).json({
        error: "Unabe to retrieve files",
      });
    }
    res.json({ files });
  });
});

app.listen(port, () => {
  console.log("Listening on port", port);
});

//it reads the file resent in the given path if path || file name is not correct then File not found and if
//everything is aright then it returns the files contents
app.get("/files/:fileName", (req, res) => {
  const filePath = path.join(__dirname, "./files/", req.params.fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send("File Not Found");
    } else {
      res.send(data);
    }
  });
});

// For all other routes which all are not mentioned it returns route not found
app.all("*", (req, res) => {
  res.status(404).send("Route Not Found");
});
module.exports = app;
