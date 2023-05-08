const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req["headers"] || req["rawHeaders"];
    const token = authHeader.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
    console.log(error);
  }
};

const hasAuthority = (req, res, next) => {
  try {
    const authHeader = req["headers"] || req["rawHeaders"];
    const token = authHeader.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userRole = decodedData?.role;
    } else {
      decodedData = jwt.decode(token);
      req.userRole = decodedData?.role;
    }

    if (req.userRole !== "admin") {
      res.status(401).send({ message: "Unauthorized" });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
    console.log(error);
  }
};

module.exports = { auth, hasAuthority };
