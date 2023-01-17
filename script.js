const form = document.querySelector('.card form');
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/';
const NEW_URL = 'https://jsonplaceholder.typicode.com/todos/?page=1&_limit=7';
const todosArray = [];
const todoListCard = document.querySelector('.card');

//Hämtar från databasen
const getTodos = () => {
    fetch(NEW_URL)
    .then(res => res.json())
    .then (data => {
        data.forEach(todo => {
            todosArray.push(todo)
        })

        listTodos();
    })
}

getTodos();

// Listar upp todosen i DOMen
const listTodos = () => {
todosArray.forEach(todo => {

    const todoItem = document.createElement('div');
    todoItem.classList.add('todos');

    const pInput = document.createElement('p');
    pInput.innerText = todo.title;

    const btn = document.createElement('button');
    btn.innerText = 'delete';
    btn.classList.add('btn')
    btn.classList.add('btn-dark')
    btn.id = todo.id;

    todoItem.appendChild(pInput);
    todoItem.appendChild(btn);
    todoListCard.appendChild(todoItem);
})
};


console.log(todosArray)

//Skapa element som läggs till vid submit
const createTodoElement = (todoInput) =>{
    const todoItem = document.createElement('div');
    todoItem.classList.add('todos');

    const pInput = document.createElement('p');
    pInput.innerText = todoInput;

    const btn = document.createElement('button');
    btn.classList.add('btn')
    btn.classList.add('btn-dark')
    btn.innerText = 'delete';
    

    todoItem.appendChild(pInput);
    todoItem.appendChild(btn);

    return todoItem
}


//HÄMTAR ANVÄNDARINPUT OCH POSTAR TILL DATABAS

const addTodos = (e) => {

    ////hämtar det som skrivs och validerar
        e.preventDefault();
        const input = form.querySelector('input');
        const inputValue = input.value;
        
        if(inputValue.trim().length == ""){
            //tbd skapa ett element och lägg till innertext
            return
        };
        
        input.value= '';

        //Skapar objekt att skicka till databasen
        const newTodo = {
            title: inputValue
        }
        console.log(newTodo)
        
        fetch(BASE_URL, {
            method: 'POST', 
            body: JSON.stringify(newTodo),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then (data => {
              todosArray.push(data);
              const todoItem = document.createElement('div');
              todoItem.classList.add('todos');
          
              const pInput = document.createElement('p');
              pInput.innerText = inputValue;
          
              const btn = document.createElement('button');
              btn.classList.add('btn')
              btn.classList.add('btn-dark')
              btn.innerText = 'delete';
              
          
              todoItem.appendChild(pInput);
              todoItem.appendChild(btn);
              todoListCard.appendChild(todoItem);
              console.log(todosArray)
              todosArray.forEach(input => {
              btn.id = input.id;
              })
              
            })

}

form.addEventListener('submit', addTodos);





//TA BORT

const removeTodo = (e) => {
    // if(e.target.classList.contains('done')){
    //     return
    // }
    if(e.target.innerText === 'delete' && !e.target.previousElementSibling.classList.contains('done')){
        fetch(BASE_URL + e.target.id, {
            method: 'DELETE'
        })
        .then(res => {
            console.log(res)
            if (res.ok){
                e.target.parentElement.remove();
            }
             return res.json()})
        
    }
    if(e.target.previousElementSibling.classList.contains('done')){
        //tbd skapa klass och aktivera modal
    }
    
    if(e.target.nodeName === 'P'){
        e.target.classList.toggle('done')
    }
    if(e.target.nodeName === 'DIV' || e.target.nodeName === 'DIV'){

        e.target.querySelector('p').classList.toggle('done')
    }

}


//lyssnar efter att ta bort vid delete samt överstrykning av text
todoListCard.addEventListener('click', removeTodo);
