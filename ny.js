

    const createTodoElement = (todoInput) =>{
        const todoItem = document.createElement('div');
        todoItem.classList.add('todos');
    
        const pInput = document.createElement('p');
        pInput.innerText = todoInput;
    
        const btn = document.createElement('button');
        btn.innerText = 'delete';
    
        todoItem.appendChild(pInput);
        todoItem.appendChild(btn);
    
        return todoItem
    }

    
const addTodos = (e) => {

    ////hämtar det som skrivs och validerar
        e.preventDefault();
        const input = form.querySelector('input');
        const inputValue = input.value;
        
        if(inputValue.trim().length == ""){
            //skapa ett element och lägg till innertext
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
              const todoItem = createTodoElement(inputValue);
              todoListCard.appendChild(todoItem);
            })

}

form.addEventListener('submit', addTodos);


//TEST
const listTodos = () => {
    todosArray.forEach(todo => {

        const userElement = createElementSubmitTodo(todo);
        todoListCard.appendChild(userElement);
        
    })
    };


    const createElementSubmitTodo = (todo) => {
        const todoBlock = document.createElement('div');
        todoBlock.id = todo.id; //todo från foreach
        todoItem.classList.add('todos');

        const p = document.querySelector('.card p');
        p.innerText = todo.title;

        const btn = document.createElement('button');
        btn.innerText = 'delete';

        todoBlock.appendChild(p);
        todoBlock.appendChild(btn);

        return todoBlock
    }



    //TEST
// const listTodos = () => {
//     todosArray.forEach(todo => {

//         const userElement = createElementSubmitTodo(todo);
//         todoListCard.appendChild(userElement);
        
//     })
//     };


//TEST

// const createElementSubmitTodo = (todo) => {
//     const todoBlock = document.createElement('div');
//     todoBlock.id = todo.id; //todo från foreach
//     todoBlock.classList.add('todos');

//     const p = document.createElement('p');
//     p.innerText = todo.title;
   

//     const btn = document.createElement('button');
//     btn.innerText = 'delete';

//     todoBlock.appendChild(p);
//     todoBlock.appendChild(btn);

//     return todoBlock
// };

