const Contact = require('../models/contact.model')

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({})
        res.status(200).json({contacts})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getContact = async (req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findById(id)
        res.status(200).json({contact})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const createContact = async (req, res) => { 
    try {
        const contact = await Contact.create(req.body)
        res.status(200).json({contact})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateContact = async (req, res) => {
    try {
        const {id} = req.params
        const contact = await Contact.findByIdAndUpdate(id, req.body)
        
        if(!contact) {return res.status(404).json({message: 'Contact not found'})}

        const updateContact = await Contact.findById(id)
        res.status(200).json({updateContact})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteContact = async (req, res) => {
    try {
        const {id} = req.params
        const contact = await Contact.findByIdAndDelete(id, req.body)
        
        if(!contact) {return (res.status(404).json({message: 'Contact not found'}))}

        const deleteContact = await Contact.findById(id)
        res.status(200).json("deleted succes")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}