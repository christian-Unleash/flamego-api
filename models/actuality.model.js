const mongoose = require("mongoose");
const sanitize = require("mongo-sanitize"); // Protection contre les injections MongoDB
const validator = require("validator"); // Pour la validation d'URL et autres

const ActualitySchema = new mongoose.Schema(
  {
    date: { type: Date },
    title: {
      type: String,
      // required: [true, "Donner un titre à votre article"],
      trim: true,
      minlength: [2, "Le titre doit contenir au moins 2 caractères."],
      maxlength: [50, "Le titre ne peut pas dépasser 50 caractères."],
    },

    text: {
      type: String,
      // required: [true, "Entrer votre article"],
      trim: true,
      minlength: [10, "Le texte doit contenir au moins 10 caractères."],
      maxlength: [500, "Le texte ne peut pas dépasser 500 caractères."],
    },
    filePath: { type: String, required: true }, // Chemin vers l'image ou la vidéo
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

// Middleware pré-enregistrement pour nettoyer les entrées
ActualitySchema.pre("save", function (next) {
  // Sanitize les champs pour éviter toute injection MongoDB
  this.filePath = sanitize(this.filePath);
  this.title = sanitize(this.title);
  this.text = sanitize(this.text);
  this.date = sanitize(this.date)

  // Ajout d'une étape pour potentiellement vérifier ou nettoyer les données ici
  // Exemple : nettoyage d'HTML ou autres contenus malveillants dans `text`
  next();
});

const Actuality = mongoose.model("Actuality", ActualitySchema);

module.exports = Actuality;
