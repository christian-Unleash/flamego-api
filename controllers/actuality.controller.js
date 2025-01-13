const Actuality = require("../models/actuality.model");

const getActualitys = async (req, res) => {
  try {
    const actualitys = await Actuality.find({});
    res.status(200).json({ actualitys });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getActuality = async (req, res) => {
  try {
    const { id } = req.params;
    const actuality = await Actuality.findById(id);
    if (!actuality) {
      return res.status(404).json({ message: "Actualité non trouvée" });
    }
    res.status(200).json({ actuality });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createActuality = async (req, res) => {
  try {
    const { date, title, text } = req.body;
    // Vérifiez si un fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({ message: "Une image est obligatoire." });
    }
    // Enregistrez l'actualité dans la base de données
    const actuality = await Actuality.create({
      date,
      title,
      text,
      filePath: `/uploads/${req.file.filename}`,
    });
    res.status(201).json({ message: "Actualité créée avec succès.", actuality });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateActuality = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, title, text } = req.body;
    const filePath = req.file ? req.file.path : undefined; // Nouveau fichier téléchargé (si disponible)
    const updatedData = {
      date,
      title,
      text,
      ...(filePath && { filePath }), // Ajoutez le fichier uniquement s'il a été téléchargé
    };
    const actuality = await Actuality.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    ); // 'new' retourne le document mis à jour

    if (!actuality) {
      return res.status(404).json({ message: "Actualité non trouvée" });
    }

    res.status(200).json({ actuality });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteActuality = async (req, res) => {
  try {
    const { id } = req.params;
    const actuality = await Actuality.findByIdAndDelete(id);

    if (!actuality) {
      return res.status(404).json({ message: "Actualité non trouvée" });
    }

    res.status(200).json({ message: "Supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActualitys,
  getActuality,
  createActuality,
  updateActuality,
  deleteActuality,
};
