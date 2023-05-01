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
        newTask.classList.add( "form-control" );
        newTask.placeholder = "Enter Next Task Here";


        const newDiv = document.createElement( "div" );
        newDiv.classList.add( "form-floating" );

        const newLabel = document.createElement( "label" );
        newLabel.setAttribute( "for", `todoTask${ i }` );
        newLabel.textContent = "Enter Task / List Item Here";
        newLabel.id = `labelToDoTask${ i }`;





        document.querySelector( "#addTask" ).appendChild( newDiv );
        newDiv.appendChild( newTask );
        newDiv.appendChild( newLabel );
        newTask.focus();

    }
    else
    {
        document.getElementById( "labelToDoTask" + i ).textContent = "First fill this field before adding more tasks.";
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

const xs = document.querySelector( "#container" ).querySelectorAll( 'input[type="text"]' );
xs.forEach( ( x ) =>
{
    x.addEventListener( "focusin", ( e ) =>
    {
        x.nextElementSibling.style.visibility = "visible";
    } );
    x.addEventListener( "focusout", ( e ) =>
    {
        x.nextElementSibling.style.visibility = "hidden";
    } );
} );