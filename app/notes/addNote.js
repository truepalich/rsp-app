module.exports = function(app, collection) {
    app.post('/api/notes', async (req, res) => {

        let note = req.body;

        try {
            let result = await collection.insert(note);
            res.send(result);
        } catch (err) {
            console.log(err);
        }
    })
}


// db.collection('post').insertOne(post, (err, result) => {
//     if (err) console.log(err);
//     console.log(result);
//     app.send();
// });
