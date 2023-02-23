const postvalidator = (req, res, next) => {
  const presentFields = ["title", "body", "device"];

  for (let i = 0; i < presentFields.length; i++) {
    const field = presentFields[i];
    if (!req.body[field]) {
      return res.status(400).json({ err: "All the fields are not there" });
    }
  }

  next();
};

module.exports = { postvalidator };