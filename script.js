const form = document.querySelector('.card form');
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';
const todosArray = [];
const todoListCard = document.querySelector('.card');

//Hämtar från databasen
const getTodos = () => {
    fetch(BASE_URL)
    .then(res => res.json())
    .then (data => {
        data.forEach(todo => {
            todosArray.push(todo)
        })

        listTodos();
    })
}

getTodos();

//Listar upp todosen i DOMen
const listTodos = () => {
todosArray.forEach(todo => {
    // const todoElement = jsonTodoElement(todoItem);
    // todoListCard.appendChild(todoElement);

    todoItem = document.createElement('div');
    todoItem.classList.add('todos');

    pInput = document.createElement('p');
    pInput.innerText = todo.title;

    btn = document.createElement('button');
    btn.innerText = 'delete';

    todoItem.appendChild(pInput);
    todoItem.appendChild(btn);
    todoListCard.appendChild(todoItem);
})
};

console.log(todosArray)

//Skapa element som läggs till vid submit
const createTodoElement = (todoInput) =>{
    todoItem = document.createElement('div');
    todoItem.classList.add('todos');

    pInput = document.createElement('p');
    pInput.innerText = todoInput;

    btn = document.createElement('button');
    btn.innerText = 'delete';

    todoItem.appendChild(pInput);
    todoItem.appendChild(btn);

    return todoItem
}

// //funktion för att visa json todos
// const jsonTodoElement = (todoInput) =>{
//     todoItem = document.createElement('div');
//     todoItem.classList.add('todos');

//     pInput = document.createElement('p');
//     pInput.innerText = todoInput.title;

//     btn = document.createElement('button');
//     btn.innerText = 'delete';

//     todoItem.appendChild(pInput);
//     todoItem.appendChild(btn);

//     return todoItem
// }



//hämtar det som skrivs och validerar
form.addEventListener('submit', (e) =>{
e.preventDefault();
const input = form.querySelector('input');
const inputValue = input.value;

if(inputValue.trim().length == ""){
    //skapa ett element och lägg till innertext
    return
};

const todoItem = createTodoElement(inputValue);
todoListCard.appendChild(todoItem);

input.value= '';

})



//lyssnar efter att ta bort vid delete samt överstrykning av text
todoListCard.addEventListener('click', e => {
    if(e.target.innerText === 'delete'){
        e.target.parentElement.remove();
    }
    
    if(e.target.nodeName === 'P'){
        e.target.classList.toggle('done')
    }
    if(e.target.nodeName === 'DIV' || e.target.nodeName === 'DIV'){

        e.target.querySelector('p').classList.toggle('done')
    }

})