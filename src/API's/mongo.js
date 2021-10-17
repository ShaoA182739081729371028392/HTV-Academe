async function login(username, password){

}
async function signup(username, password) {

}
async function insert_entry(username, password, folder_name, entry_name, photo_preview, text_data, client) {
    let structure = {_id: username, // Login System, only query the rest
        password: password, 
        folder_name: folder_name, // ID selection 
        contents: {
            // The Meat and Potatoes
            entry_name: entry_name, 
            photo_preview: photo_preview,
            transcription:  text_data
            
        }
    }
    client.collection("users").insertOne(structure, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
    });

}
async function update_entry(username, password,folder_name, entry_name, photo_preview, text_data, client) {
    // Search and Update the Value of an Entry 
    let to_update = {
        _id: username, 
        password: password, 
        folder_name: folder_name,
        contents: {
            entry_name: entry_name // Searching for It 
        }
    }
    let updated_value = {
        $set: {photo_preview: photo_preview, transcription: text_data} 
    }
    client.collection("users").updateOne(to_update, updated_value, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");    
    });

}

async function query_entry(username, password, folder_name, entry_name, client) {
    // Query an Entry
    let query = {
        _id: username, 
        password: password, 
        folder_name: folder_name,
        contents: {
            entry_name: entry_name
        }
    }
    client.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        
      });

}
async function mongo() {
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://Andrew:academe@cluster0.r8z9g.mongodb.net/academe?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("users");
        //collection.createCollection("users", function(err, res) {
        //    if (err) throw err;
        //    console.log("Collection created!");
        //});
        //insert_entry('Andrew', 'hello_world', 'Chemistry', 'Class1', 'preview.png', 'This class is so boring lmao', collection);
        query_entry('Andrew', 'hello_world', 'Chemistry', 'Class1', collection);
    // perform actions on the collection object
    });
    
    client.close();

}
mongo();