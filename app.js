const hostPort = process.env.PORT || 3000;
const express = require( "express" );
const app = express();
app.use( express.static( __dirname ) );
app.use( express.urlencoded( { extended: true } ) );
app.use( express.json() );
const mongoKey = require( "./mongoKey.js" );
const mongoHostString = `mongodb+srv://manuj8941:${ mongoKey }@joltlink.cjl86ox.mongodb.net/todoDB?retryWrites=true&w=majority`;

const ejs = require( "ejs" );
app.set( "views", __dirname );
app.set( "view engine", "ejs" );

const mongoose = require( "mongoose" );
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


app.get( "/", ( req, res ) =>
{

    Todo.find()
        .then( ( todos ) =>
        {
            res.render( "index.ejs", { todos } );
        } );
} );

app.post( "/", ( req, res ) =>
{
    const todoTasks = {};
    for ( const key in req.body )
    {
        if ( key.startsWith( 'todoTask' ) )
        {
            todoTasks[ key ] = req.body[ key ];
        }
    }


    new Todo( { todoTitle: req.body.todoTitle, todoTasks: [ ...Object.values( todoTasks ) ] } ).save()
        .then( ( todo ) =>
        {
            console.log( todo.todoTitle, "is saved" );


            Todo.find()
                .then( ( todos ) =>
                {
                    res.render( "index.ejs", { todos } );
                } );
        } )
        .catch( ( e ) =>
        {
            console.log( "here is an error: ", e );
        } );
} );

app.post( "/delete/:todoTitle/:todoTask", ( req, res ) =>
{
    const todoTitle = req.params.todoTitle;
    const todoTask = req.params.todoTask;


    Todo.findOneAndUpdate( { todoTitle: todoTitle }, { $pull: { todoTasks: todoTask } }, { new: true } )
        .then( ( todo ) =>
        {
            console.log( "updated task list is", todo );
            res.redirect( "/" );
        } )
        .catch( ( e ) =>
        {
            console.log( e );
        } );

} );

app.post( "/deleteList/:todoTitle", ( req, res ) =>
{
    const todoTitle = req.params.todoTitle;
    Todo.findOneAndDelete( { todoTitle: todoTitle } )
        .then( ( todo ) =>
        {
            console.log( todo, " List has been deleted" );
            res.redirect( "/" );
        } )
        .catch( ( e ) =>
        {
            console.log( e );
        } );
} );


// app.post( "/update/:todoTitle/:todoTask", ( req, res ) =>
// {
//     const todoTitle = req.params.todoTitle;
//     const todoTask = req.params.todoTask;
//     const updatedToDo = req.body.updatedToDo;






app.post( "/update/:todoTitle/:todoTask", ( req, res ) =>
{
    const todoTitle = req.params.todoTitle;
    const todoTask = req.params.todoTask;
    const updatedToDo = req.body.updatedToDo;


    Todo.findOneAndUpdate( { todoTitle: todoTitle, todoTasks: todoTask }, { $set: { "todoTasks.$": updatedToDo } }, { new: true } )
        .then( ( todo ) =>
        {
            console.log( todo, " is the new collection" );
            res.redirect( "/" );
        } )
        .catch( ( e ) =>
        {
            console.log( e );
        } );

} );





app.listen( hostPort, () =>
{
    console.log( `SERVER STARTED ON ${ hostPort }` );

} );