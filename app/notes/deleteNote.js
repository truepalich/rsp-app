const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, collection) {
    app.delete('/api/notes/:id', async (req, res) => {
        let query = {_id: ObjectId(req.params.id)};

        try {
            let result = await collection.deleteOne(query);
            res.send(result);
        } catch (err) {
            console.log(err);
        }
    })
}
