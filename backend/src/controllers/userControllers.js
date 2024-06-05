const { UserModel } = require("../../models/userModel");
const { db } = require("../../database/client");
const jwt = require("jsonwebtoken");

const User = new UserModel(db);

// une fonction pour générer les tokens

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
};

// get all the users
const getAllUsers = (req, res) => {
  User.readAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
    });
};

// get one user by id

getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  User.read(id)
    .then((user) => {
      const token = generateToken({ user });
      res.json({ user, token });
    })
    .catch((err) => {
      console.error(err);
    });
};

/* create a user  */

const createUser = (req, res) => {
  const { email, password, adherent_id } = req.body;
  User.create({ email, password, adherent_id })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.error(err);
    });
};

/* login user  */

const login = (req, res) => {
  const { email, password } = req.body;

  User.login(email, password)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const token = generateToken({ id: user.id });
      res.json({ user: email, token });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  login,
};
