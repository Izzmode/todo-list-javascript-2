const form = document.querySelector('.card form');
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos/';
const NEW_URL = 'https://jsonplaceholder.typicode.com/todos/?page=1&_limit=7';
const todosArray = [];
const todoListCard = document.querySelector('.card');
const modal = document.querySelector('.modal');

const todoWrapper = document.querySelector('.todo-wrapper');

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
    todoWrapper.appendChild(todoItem);

    if(todo.completed){
        pInput.classList.toggle('done');
    }
    // todoListCard.appendChild(todoItem);
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
            document.querySelector('.error').innerText = 'Du kan inte lägga till utan innehåll'
            return
        };

        document.querySelector('.error').innerText = '';
        
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
              todoWrapper.appendChild(todoItem);
            //   todoListCard.appendChild(todoItem);
              todosArray.forEach(input => {
              btn.id = input.id;
              })
              
            })

}

form.addEventListener('submit', addTodos);


//Lägger till pop-up fönster

modal.addEventListener('click', e =>{
        if(e.target.classList.contains('active')){
        modal.classList.remove('active');
    }
    
})



//TA BORT

const removeTodo = (e) => {
    if(e.target.innerText === 'delete' && e.target.previousElementSibling.classList.contains('done')){
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
    
    console.log(e.target.previousElementSibling)
    
    if(e.target.nodeName === 'P'){
        e.target.classList.toggle('done')
    }
    if(e.target.nodeName === 'DIV' || e.target.nodeName === 'DIV'){

        e.target.querySelector('p').classList.toggle('done')
    }
    if( !(e.target.previousElementSibling.classList.contains('done')) && e.target.innerText === 'delete'){
        modal.classList.add('active'); 
        
    };

}



//lyssnar efter att ta bort vid delete samt överstrykning av text
todoListCard.addEventListener('click', removeTodo);

//byt ut mot todoWrapper? fortsätt felsöka, men funkade 17/1 19.53
