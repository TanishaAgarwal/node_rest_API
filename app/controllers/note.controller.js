const Note = require('../models/note.model.js');

//Create and save a new note
exports.create = (req, res) => {
    
    //create a note
    const note = new Note({
        title: req.body.title || 'Untitled Note',
        content: req.body.content
    });

    //Save Note in database
    note.save().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while creating the note"
        });
    });

    //Validate the request
    if(!req.body.content){
        res.status(400).send({
            message: "Note content can not be empty"
        });
    }

};


//Retrieve and return all notes from db
exports.findAll = (req, res) => {
    Note.find().then((notes) => {
        res.send(notes);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


//Retrive single note by noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId).then((note) => {
       //Validate existance of note of given noteId
        if(!note){
            return res.status(404).send({
                message: 'Note not found with id' + req.params.noteId
            });
        }
        
        res.send(note);
    }).catch((err) => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: 'Note not found with id' + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};


//Update a note indentified by noteId
exports.update = (req, res) => {
    
    //Find by id and update it
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {
        new: true
    }).then(note => {
        
        //Validating existence of note by noteId
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
/*The {new: true} option in the findByIdAndUpdate() 
method is used to return the modified document to the
 then() function instead of the original. */


     // Validate Request
     if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
};


//Delete a note indentified by noteId
exports.delete = (req, res) => {
    Note.findByIdAndDelete(req.params.noteId).then((note) => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
    
};