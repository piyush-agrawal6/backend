const loginValidate = (req, res, next) => {
  const fields = ["email", "password"];
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    if (!req.body[field]) {
      return res.status(400).json({ err: "All fields are required" });
    }
  }
  next();
};

module.exports = { loginValidate };
