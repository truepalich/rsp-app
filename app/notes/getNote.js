const ObjectId = require('mongodb').ObjectId;

module.exports = function(app, collection) {
    app.get('/notes/:id', async (req, res) => {
        let query = {_id: ObjectId(req.params.id)};

        try {
            let result = await collection.findOne(query);
            res.send(result);
        } catch (err) {
            console.log(err);
        }
    })
}
