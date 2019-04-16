module.exports = (app, collection) => {

  app.get('/lists', (req, res) => {

    collection.find().toArray((err, result) => {
      if (err) return console.log(err);

      console.log('List was send');
      res.send(result.reverse())
    });

  });


};