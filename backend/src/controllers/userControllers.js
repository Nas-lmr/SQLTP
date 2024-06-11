const { UserModel } = require("../../models/userModel");
const { db } = require("../../database/client");
const jwt = require("jsonwebtoken");

const User = new UserModel(db);

// une fonction pour générer les tokens

const generateToken = (payload = {}) => {
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

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  User.read(id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
    });
};

/* create a user  */

const createUser = (req, res) => {
  const { email, password} = req.body;
  User.create({ email, password})
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.error(err);
    });
};

/* update user  */
const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { email, password, adherent_id } = req.body;

  User.update(email, password, adherent_id, id)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.error(err));
};

/* delete user  */

const deletUser = (req, res) => {
  const id = parseInt(req.params.id);

  if (req.user.userID === id || req.user.userRole === "Admin") {
    User.delete(id)
      .then((user) => {
        res.status(200).json({ message: " you have deleted ", user });
      })
      .catch((err) => console.error(err));
  } else {
    res.status(401).json({ message: "you can't delete this user" });
  }
};

/* login user  */

const login = (req, res) => {
  const { email, password } = req.body;

  User.login(email, password)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const token = generateToken(user);
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
  updateUser,
  deletUser,
};
