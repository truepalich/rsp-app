const getList = require('./app/lists/getList');
const createListItem = require('./app/lists/createListItem');
const getListItem = require('./app/lists/getListItem');
const editListItem = require('./app/lists/editListItem');
/*-----------------------*/

module.exports = (app, collection) => {
  getList(app, collection);
  createListItem(app, collection);
  getListItem(app, collection);
  editListItem(app, collection);
  /*-----------------------*/
};