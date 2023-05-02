const mongoose = require( "mongoose" );
const mongoKey = require( "./mongoKey.js" );
const mongoHostString = `mongodb+srv://manuj8941:${ mongoKey }@joltlink.cjl86ox.mongodb.net/todoDB?retryWrites=true&w=majority`;
mongoose.set( "strictQuery", false );
// mongoose.connect( "mongodb://0.0.0.0/todoDB" )
mongoose.connect( mongoHostString )
    .then( ( response ) =>
    {
        console.log( `Connected to MongoDB Atlas` );

    } )
    .catch( ( error ) =>
    {
        console.log( `Oh No MongoDB Altas Connection Error: ${ error }` );
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

        new Todo( { todoTitle: "G20", todoTasks: [ "Argentina", "Australia", "Brazil", "Canada", "China", "France", "Germany", "India", "Indonesia", "Italy", "Japan", "Mexico", "Republic of Korea", "Russia", "Saudi Arabia", "South Africa", "Turkey", "United Kingdom", "United States", "European Union" ] } ).save();
        new Todo( { todoTitle: "Quad", todoTasks: [ "Australia", "India", "Japan", "United States" ] } ).save();
        new Todo( { todoTitle: "ASEAN", todoTasks: [ "Brunei Darussalam", "Cambodia", "Indonesia", "Lao PDR", "Malaysia", "Myanmar", "Philippines", "Singapore", "Thailand", "Viet Nam" ] } ).save();
        new Todo( { todoTitle: "BRICS", todoTasks: [ "Brazil", "Russia", "India", "China", "South Africa" ] } ).save();



    }

    );