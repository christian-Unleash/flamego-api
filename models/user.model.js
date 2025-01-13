const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const sanitize = require("sanitize-html"); // Assurez-vous d'avoir installé sanitize-html

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Entrez votre nom"],
      trim: true,
      minlength: [2, "Le nom doit contenir au moins 2 caractères."],
      maxlength: [50, "Le nom ne peut pas dépasser 50 caractères."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Entrez votre email"],
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Entrez une adresse email valide."],
    },
    password: {
      type: String,
      required: [true, "Entrez votre mot de passe"],
      trim: true,
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères."],
    },
    tel: {
      type: Number,
      unique: true,
      required: [true, "Entrez votre numéro de téléphone"],
    },
    adresse: {
      type: String,
      required: [true, "Entrez votre adresse"],
      trim: true,
      minlength: [10, "L'adresse doit contenir au moins 10 caractères."],
      maxlength: [500, "L'adresse ne peut pas dépasser 500 caractères."],
    },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

// Middleware Mongoose pour hasher le mot de passe avant de sauvegarder
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Génère un sel
    this.password = await bcrypt.hash(this.password, salt); // Hash le mot de passe
    next();
  } catch (error) {
    next(error);
  }
});

// Middleware pré-enregistrement pour nettoyer les entrées
UserSchema.pre("save", function (next) {
  this.name = sanitize(this.name, { allowedTags: [], allowedAttributes: {} });
  this.email = sanitize(this.email, { allowedTags: [], allowedAttributes: {} });
  this.tel = sanitize(this.tel.toString(), { allowedTags: [], allowedAttributes: {} });
  this.adresse = sanitize(this.adresse, { allowedTags: [], allowedAttributes: {} });
  next();
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
