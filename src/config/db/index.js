const mongoose = require('mongoose');
async function connect (){

    try {
        await mongoose.connect('mongodb+srv://volanhat:12345@app-todo-second.mgiiu.mongodb.net/todo-app?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connect success')            
    } catch (error) {
        console.log('Connect failed')
    }

}

module.exports = {connect};