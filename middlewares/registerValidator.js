const registerValidate = (req, res, next) => {
  const fields = ["name", "email", "password"];
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (!req.body[field]) {
      return res.status(400).json({ err: "All the fields are required" });
    }
  }
  next();
};

module.exports = { registerValidate };
