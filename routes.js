const getList = require('./app/lists/getList');
const createListItem = require('./app/lists/createListItem');
const getListItem = require('./app/lists/getListItem');
const editListItem = require('./app/lists/editListItem');
/*-----------------------*/
const getAllNotes = require('./app/notes/getAllNotes');
const addNote = require('./app/notes/addNote');
const editNote = require('./app/notes/editNote');
const deleteNote = require('./app/notes/deleteNote');
const getNote = require('./app/notes/getNote');

module.exports = (app, collection) => {
  getList(app, collection);
  createListItem(app, collection);
  getListItem(app, collection);
  editListItem(app, collection);
  /*-----------------------*/
  getAllNotes(app, collection);
  getNote(app, collection);
  addNote(app, collection);
  editNote(app, collection);
  deleteNote(app, collection);
};