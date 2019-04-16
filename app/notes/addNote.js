module.exports = function(app, collection) {
    app.post('/api/notes', async (req, res) => {

        console.log(req);
        let note = req.body;


        // let note = {
        //     title: "Title for note2",
        //     desc: "Text will be here",
        //     list: [
        //         {
        //             text: "to do #1",
        //             status: true
        //         }],
        //     type: "note"
        // }

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
