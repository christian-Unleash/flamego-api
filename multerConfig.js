const multer = require("multer");
const path = require("path");

// Définir le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Répertoire de stockage
  },
  filename: (req, file, cb) => {
    // Générer un nom unique pour chaque fichier
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }

});

// Filtrage des fichiers pour accepter uniquement les images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv|webp/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers images sont autorisés !'));
  }
}

// Initialiser Multer
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limite de 10 Mo
  fileFilter,
});

module.exports = upload;
