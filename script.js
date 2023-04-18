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

    //hämtar det som skrivs och validerar
        e.preventDefault();
        const input = form.querySelector('input');
        const inputValue = input.value;
        
        if(inputValue.trim().length == ""){
            document.querySelector('.error').innerText = 'Du kan inte lägga till utan innehåll'
            return
        };

        document.querySelector('.error').innerText = '';
        
        input.value= '';

        //Skapar objekt att skicka till databasen
        const newTodo = {
            title: inputValue
        }
        
        
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
              btn.id=crypto.randomUUID();
              data.id=btn.id;
          
              todoItem.appendChild(pInput);
              todoItem.appendChild(btn);
              todoWrapper.appendChild(todoItem);
            
            console.log(todosArray)
              
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
    console.log(e.target.id)
    if(e.target.innerText === 'delete' && e.target.previousElementSibling.classList.contains('done')){
        fetch(BASE_URL + e.target.id, {
            method: 'DELETE'
        })
        .then(res => {
            console.log(res)
            if (res.ok){
                e.target.parentElement.remove();

                const index = todosArray.findIndex(todo => todo.id == e.target.id)
                todosArray.splice(index, 1)
                

            }
            console.log(todosArray)
             return res.json()})
    }
    
    
    if(e.target.nodeName === 'P'){
        e.target.classList.toggle('done')
    }
    if(e.target.nodeName === 'DIV'){

        e.target.querySelector('p').classList.toggle('done')
    }
    if(e.target.innerText === 'delete' && !(e.target.previousElementSibling.classList.contains('done')) ){
        modal.classList.add('active'); 
        
    };

}



//lyssnar efter att ta bort vid delete samt överstrykning av text
todoListCard.addEventListener('click', removeTodo);

