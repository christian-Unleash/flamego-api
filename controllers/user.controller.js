const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1h" } // Le token expire en 1 heure
    // );

    // const loginAttempts = {};

    // if (loginAttempts[email] && loginAttempts[email] >= 5) {
    //   return res
    //     .status(429)
    //     .json({ message: "Trop de tentatives échouées. Réessayez plus tard." });
    // }


    res.json({ message: "Connexion réussie", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error });
  }

};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const create = await User.create(req.body);
    res.status(200).json({ create });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }

    // const updateUser = await User.findById(id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id, req.body);

    if (!user) {
      return res.status(404).json({ message: "user is not found" });
    }

    const deleteUser = await User.findById(id);
    res.status(200).json("deleted succes");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
};
