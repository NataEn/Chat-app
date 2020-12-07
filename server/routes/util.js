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
};
