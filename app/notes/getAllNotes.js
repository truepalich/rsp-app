module.exports = function (app, collection) {
    app.get('/api/all-notes', async (req, res) => {
        let result = {};
        try {
            result = await collection.find({}).toArray();
            console.log(result);
        } catch (err) {
            console.log(err);
        }

        // Promise.all.result
        res.send(result.reverse());
    })
}