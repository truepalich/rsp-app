const ObjectId = require('mongodb').ObjectId;

module.exports = (app, collection) => {
  app.put('/api/lists/:id', (req, res) => {
    collection.findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:{list:25}}, (err, result) => {
      if (err) {
        return console.log(err)
      }
      console.log('old item updated');
      res.send(`ONE LIST ITEM WAS UPDATED`)
    })
  });
};