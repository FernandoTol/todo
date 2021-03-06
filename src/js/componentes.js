import { Todo } from '../classes'
import { todoList } from '../index'

//Referencias al HTMRL
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btBorrar      = document.querySelector('.clear-completed');
const ulFiltors     = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro')



export const crearTodoHtml = (todo) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completed) ? 'checked' : ''}>
            <label>${ todo.tarea } </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild ); // El firstElementChild es para insertar el primer hijo

    return div.firstElementChild;

}

//Eventos
txtInput.addEventListener( 'keyup', () => {
    if( event.keyCode === 13 && txtInput.value.length > 0 ) {
        console.log( txtInput.value);
        const nuevoTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );
        txtInput.value = '';
    }
})

divTodoList.addEventListener( 'click', () => {

    const nobreElemento = ( event.target.localName );
    const todoElemento  = event.target.parentElement.parentElement;
    const todoId        = todoElemento.getAttribute( 'data-id' );

    if ( nobreElemento.includes( 'input' )){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle( 'completed' );
    }else if ( nobreElemento.includes( 'button' )){
        todoList.eliminarTodos ( todoId );
        divTodoList.removeChild ( todoElemento );
    }

})

btBorrar.addEventListener( 'click', () => {

    todoList.eliminarCompletados();

    for ( let i = divTodoList.children.length-1; i >= 0; i-- ){

        const elemento = divTodoList.children[ i ];

        if( elemento.classList.contains( 'completed' ) ){
            divTodoList.removeChild( elemento )
        }
    }

})

ulFiltors.addEventListener( 'click', (event) => {

    const filtro = event.target.text;
    console.log( filtro );
    if ( !filtro ){ return; }

    anchorFilters.forEach( elem => elem.classList.remove( 'selected' ));
    event.target.classList.add( 'selected' );

    for ( const elemento of divTodoList.children ){

        elemento.classList.remove( 'hidden' );
        const completado = elemento.classList.contains( 'completed' );

        switch (filtro) {
            case 'Pendientes':
                if ( completado ){
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if ( !completado ){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
})