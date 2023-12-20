const fs = require("fs");
const content = "I am trying to code to write something in the file";

fs.writeFile("a.txt", content, "utf-8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log("Updated");
});
