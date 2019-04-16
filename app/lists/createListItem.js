module.exports = (app, collection) => {
  app.post('/api/lists', (req, res) => {
    collection.insertOne(req.body, (err, result) => {
      if (err) {
        return console.log(err)
      }
      console.log('new item received');
      res.send(`ONE LIST ITEM WAS ADDED`)
    })
  });
};