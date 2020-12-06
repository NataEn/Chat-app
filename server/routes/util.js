const errHandler = (err, req, res) => {
  console.log(`err on: ${req.originalUrl} message: ${err}`);
  console.log(`method: ${req.method}`);
  let status;
  switch (req.method) {
    case "GET":
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
