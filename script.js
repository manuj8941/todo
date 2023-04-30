let i = 0;

document.querySelector( "#addMoreTasksButton" ).addEventListener( "click", ( e ) =>
{
    if ( document.getElementById( "todoTask" + i ).value )
    {
        i++;
        const newTask = document.createElement( "input" );
        newTask.type = "text";
        newTask.required = true;
        newTask.id = `todoTask${ i }`;
        newTask.name = `todoTask${ i }`;
        newTask.placeholder = "Enter Next Task Here";

        const lineBreak = document.createElement( "br" );


        document.querySelector( "#addTask" ).appendChild( newTask );
        newTask.focus();
        document.querySelector( "#addTask" ).appendChild( lineBreak );
    }
    else
    {
        document.getElementById( "todoTask" + i ).placeholder = "fill this one first";
    }


} );


const checkboxes = document.querySelectorAll( 'input[type="checkbox"]' );
checkboxes.forEach( ( checkbox ) =>
{
    checkbox.addEventListener( 'change', ( event ) =>
    {
        if ( checkbox.checked )
        {
            checkbox.nextElementSibling.style.textDecoration = "line-through";
        } else
        {
            checkbox.nextElementSibling.style.textDecoration = "none";
        }

    } );
} );
