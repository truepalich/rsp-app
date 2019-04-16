const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, collection) {
    app.put('/api/notes/:id', async (req, res) => {
        let query = {_id: ObjectId(req.params.id)};
        let infoForUpd = {title: 'New title333333'};

        try {
            let result = await collection.updateOne(query, {$set: infoForUpd}, {upsert: true});
            res.send(result);
        } catch (err) {
            console.log(err);
        }
    })
}
