console.log('Starting notes.js');
const fs = require('fs');

/*
Method to fetch notes.
*/
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch(e) {
     return []
  }
};

/*
Method to save note.
*/
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

/*
Method to add note.
*/
var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

 var duplicateNotes = notes.filter((note) => note.title === title);
 console.log("duplicateNotes : " + duplicateNotes);
 if(duplicateNotes.length === 0){
   notes.push(note);
   saveNotes(notes);
   return note;

 }
};

var getAll = () => {
  console.log('Getting all notes');
};

var getNote = (title) => {
  console.log('Getting note: ', title);
  //fetchNotes
  var notes = fetchNotes();
  //filteredNotes
  var filteredNotes = notes.filter((note) => note.title === title)
  //returnnotes
  return filteredNotes[0];
};

var removeNote = (title) => {
   //fetch notes
   var notes = fetchNotes();

   // filter notes, removing one with title of argument

   var filteredNotes = notes.filter((note) => note.title !== title);
   // save new notes array
   saveNotes(filteredNotes);

   return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  debugger;
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,removeNote, logNote
};
