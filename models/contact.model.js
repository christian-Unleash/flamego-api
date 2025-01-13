const mongoose = require('mongoose');
const sanitize = require('mongo-sanitize'); // Protection contre les injections MongoDB

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Entrez votre nom'],
            trim: true,
            minlength: [2, 'Le nom doit contenir au moins 2 caractères.'],
            maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères.'],
        },
        email: {
            type: String,
            required: [true, 'Entrez votre email'],
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Entrez une adresse email valide.',
            ], // Validation du format email
        },
        message: {
            type: String,
            required: [true, 'Entrez votre message'],
            trim: true,
            minlength: [10, 'Le message doit contenir au moins 10 caractères.'],
            maxlength: [500, 'Le message ne peut pas dépasser 500 caractères.'],
        },
    },
    {
        timestamps: true, // Active createdAt et updatedAt automatiquement
    }
);

// Middleware pré-enregistrement pour nettoyer les entrées
ContactSchema.pre('save', function (next) {
    this.name = sanitize(this.name);
    this.email = sanitize(this.email);
    this.message = sanitize(this.message);
    next();
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
