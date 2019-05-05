const ObjectId = require('mongodb').ObjectId;

module.exports = (app, collection) => {
    app.delete('/api/lists/:id', (req, res) => {
        collection.deleteOne({_id:ObjectId(req.params.id)}, (err, result) => {
            if (err) {
                return console.log(err)
            }
            console.log('DELETED')
            res.send(JSON.stringify({msg:'One item was deleted'}))
        })
    });
};