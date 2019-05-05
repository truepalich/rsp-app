const ObjectId = require('mongodb').ObjectId;

module.exports = (app, collection) => {
  app.put('/api/lists/:id', (req, res) => {
    collection.findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:{list:req.body}}, (err, result) => {
      if (err) {
        return console.log(err)
      }
      res.send(JSON.stringify({msg:'One item was updated'}))
    })
  });
};