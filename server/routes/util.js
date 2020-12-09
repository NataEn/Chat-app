const fs = require("fs");
const path = require("path");

const readFile = async (path) => {
  const buffer = await fs.readFileSync(path, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
  });
  return buffer;
};
const writeFile = async (filename, buffer) => {
  const file = path.join(process.cwd(), "uploads", filename);
  console.log("in write file");
  await fs.writeFile(file, buffer, function (err) {
    if (err) {
      console.log(err);
    }
    console.log(`file: ${filename} saved`);
  });
};

const errHandler = (err, req, res) => {
  console.log(`err on: ${req.originalUrl} message: ${err}`);
  console.log(`method: ${req.method}`);
  let status;
  console.log(err);
  switch (req.method) {
    case "GET":
    case "DELETE":
    case "PATCH":
      status = 500;
      break;
    case "POST":
    case "PUT":
      status = 400;
      break;
  }
  return res.status(status).json({ message: err });
};

module.exports = {
  errHandler,
  readFile,
  writeFile,
};
