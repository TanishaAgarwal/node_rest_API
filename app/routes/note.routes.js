module.exports = app => {
  const notes = require("../controllers/note.controller.js");

  //create a new Notes
  app.post("/notes", notes.create);

  //retrieve all notes
  app.get("/notes", notes.findAll);

  //retrieve single note by noteId
  app.get("/notes/:noteId", notes.findOne);

  //update a note with noteId
  app.put("/notes/:noteId", notes.update);

  //delete a note with noteId
  app.delete("/notes/:noteId", notes.delete);
};

/*Note that We have added a require statement for note.controller.js file. 
We’ll define the controller file in the next section. The controller will 
contain methods for handling all the CRUD operations. */
