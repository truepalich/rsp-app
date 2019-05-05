module.exports = (app, collection) => {
  app.post('/api/lists', (req, res) => {
    collection.insertOne(req.body, (err, result) => {
      if (err) {
        return console.log(err)
      }
      res.send(JSON.stringify({msg:'One item was added'}))
    })
  });
};