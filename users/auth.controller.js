const User = require("./user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, email: user.email },
    "ac0f79626a62b3db47ccdb1aede0e2b1e94d2dc38686de0d5e352c7561548aad",
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user,
  };
};
const register = async (req, res) => {
  const { email, password } = req.body;

  // checking to see if email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ error: "Email already in use." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({ ...req.body, password: hashedPassword });

  // generate token
  const token = generateToken(user);

  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid credential" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credential" });
  }

  // generate token
  const token = generateToken(user);

  res.status(200).json({ token });
};

module.exports = { register, login };
