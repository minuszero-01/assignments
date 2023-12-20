// const fs = require("fs");
// fs.readFile("file.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
//   let file_content = data.replace(/\s/g, " ");
//   console.log(file_content);
// });

const fs = require("fs");

function removeExtraSpaces(inputFilePath) {
  const content = fs.readFileSync(inputFilePath, "utf-8");
  const modifiedContent = content.replace(/\s+/g, " ");
  fs.writeFileSync(inputFilePath, modifiedContent, "utf-8");
}

// Example usage:
const inputFilePath = "file.txt";
removeExtraSpaces(inputFilePath);
