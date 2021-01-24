const form = document.getElementById('form')
const todosHolder = document.querySelector('.todos')
const formInput = document.getElementById('todo-form')
const checkInput = document.querySelectorAll('#todo')
const deleteBtn = document.querySelector('.delete-completed')
const state = document.querySelector('.state')
const previousInputClass = localStorage['inputClass']

function main(){
    document.addEventListener('DOMContentLoaded',getTodos )
    itemsLeft()
    form.addEventListener('submit', addTodo)
    deleteBtn.addEventListener('click',deleted)
    state.addEventListener('click',filterTodos)
    todosHolder.addEventListener('click', addCompleted)
}


function addTodo(e){
    e.preventDefault()
    /* create todo div */
    const todo = document.createElement('div');
    todo.classList.add('todo')  /* add a todo class to div */
    todo.classList.add('active') 
    /* create checkbox */
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.id = 'todo'
    todo.appendChild(checkbox)
    /* create span */
    const span = document.createElement('span');
    span.innerHTML = formInput.value;
    saveTodos(formInput.value)
    todo.appendChild(span)
    todosHolder.appendChild(todo)
    formInput.value = ''
    itemsLeft()
}


function addCompleted(e){
    const item = e.target
    if(item.id == 'todo'){
        
    // item.parentElement.classList.remove('active')
    // item.classList.toggle('input-completed')
    // item.parentElement.classList.toggle('completed')
    index = document.querySelectorAll('#todo')
        // console.log(item)
        for(let i = 0; i < index.length; i++){
            if(item == index[i]){
                console.log(index[i])
                if(item.parentElement.classList.contains('active')){    
                    // console.log(document.querySelectorAll('#todo')[i])
                    if(index[i].classList.contains('input-completed')){
                        console.log(index[i])
                        index[i].parentElement.classList.remove('active')
                        index[i].classList.toggle('input=completed')
                        index[i].classList.toggle('completed')
                        // localStorage['todoClass'] = ['completed']
                    }
                }else{
                    item.parentElement.classList.add('active')
                    item.classList.toggle('input-completed')
                    item.parentElement.classList.toggle('completed')
                }
            }
            

                }

           

        
        itemsLeft()
    } 
}
           
    
    

function deleted(){
    const todos = document.querySelectorAll('.todo')
    todos.forEach(todo =>{
        if(todo.classList.contains('completed')){
            deletedTodos(todo)
            todo.remove()
        }
    })
}
function itemsLeft(){
    const itemsLeft = document.getElementById('items-left')
    const active = document.querySelectorAll('.active').length
    itemsLeft.innerHTML = active

}

function filterTodos(e){
    const item = e.target;
    const todos = document.querySelectorAll('.todo')
    const next = item.nextElementSibling;
    const previous = item.previousElementSibling;
    const currentLocation = item
    const state = document.querySelectorAll('.state span')

    for(let i = 0; i < state.length; i++ ){
        if(state[i] != currentLocation){
            state[i].className = '' 
        }else{
             state[i].className = 'controls-position'
        }
    }
    todos.forEach(todo =>{
       switch (item.id) {
        case 'active':
            if(todo.classList.contains('active')){
                todo.style.display ='block'
            }else{
                todo.style.display='none'
            }
            break;
        case 'completed':
            item.classList.toggle('controls-position')
            if(todo.classList.contains('completed')){
                todo.style.display='block'
            }else{
                todo.style.display='none'
            }
            break;
        case 'all':
            
            todo.style.display ='block'
            break;
    } 
    })
    
    
}

function saveTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    } else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function deletedTodos(todo){
     let todos;
        if(localStorage.getItem('todos') === null){
            todos = []
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        const todoIndex = todo.children[0].nextElementSibling.innerText
        console.log(todoIndex)
        todos.splice(todos.indexOf(todoIndex),1)
        localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(newtodo){
        let previousClass = localStorage['todoClass'];
        
        /* create todo div */
        const todo = document.createElement('div');
        todo.classList.add('todo')  /* add a todo class to div */
        todo.classList.add('active')

        if(previousClass){
            todo.classList.toggle(previousClass)
        }

        /* create checkbox */
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'
        checkbox.id = 'todo'
        todo.appendChild(checkbox)
        /* create span */
        const span = document.createElement('span');
        span.innerHTML = newtodo;
        todo.appendChild(span)
        todosHolder.appendChild(todo)
        formInput.value = ''
        itemsLeft()
    })
    let todoCompleted
    if(localStorage.getItem('todoCompleted') === null){
        todoCompleted = []
    }else{
        todoCompleted = JSON.parse(localStorage.getItem('todoCompleted'));
    }
    todoCompleted.forEach(function(completed){
        if(completed in todos ){
            //
        }
    })
    
}
main()
