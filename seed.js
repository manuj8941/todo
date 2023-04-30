const mongoose = require( "mongoose" );
mongoose.set( "strictQuery", false );
mongoose.connect( "mongodb://0.0.0.0/todoDB" )
    .then( ( response ) =>
    {
        console.log( `Connected to MongoDB Local` );

    } )
    .catch( ( error ) =>
    {
        console.log( `Oh No MongoDB Local Connection Error: ${ error }` );
    } );

const TodoSchema = new mongoose.Schema(
    {
        todoTitle: { type: String },
        todoTasks: [ { type: String } ],
    } );
const Todo = mongoose.model( "Todo", TodoSchema );

Todo.deleteMany( {} )
    .then( () =>
    {
        new Todo( { todoTitle: "SAARC", todoTasks: [ "India", "Pakistan", "Lanka", "Afghanistan", "Bangladesh", "Nepal", "Maldives" ] } ).save();
        new Todo( { todoTitle: "NATO", todoTasks: [ "United States", "Canada", "Australia", "New Zealand", "United Kingdom", "France", "Germany", "Italy" ] } ).save();
        new Todo( { todoTitle: "Warsaw Pact", todoTasks: [ "Russia", "Ukraine", "Belarus", "Norway", "Poland" ] } ).save();
    }

    );