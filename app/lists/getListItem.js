const ObjectId = require('mongodb').ObjectId;

module.exports = (app, collection) => {

  app.get('/lists/:id', (req, res) => {

    collection.find({_id:ObjectId(req.params.id)}).toArray((err, result) => {
      if (err) return console.log(err);

      console.log('List item was found');
      res.send(result)
    });

  });


};