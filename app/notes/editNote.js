const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, collection) {
    app.put('/api/notes/:id', async (req, res) => {
        let query = {_id: ObjectId(req.params.id)};

        try {
            let result = await collection.updateOne(query, {$set: req.body}, {upsert: true});
            res.send(result);
        } catch (err) {
            console.log(err);
        }
    })
}
