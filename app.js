const form = document.getElementById('form')
const todosHolder = document.querySelector('.todos')
const formInput = document.getElementById('todo-form')
const checkInput = document.querySelectorAll('#todo')
const deleteBtn = document.querySelector('.delete-completed')
const state = document.querySelector('.state')
const dragText = document.getElementById('drag-drop')
const controls = document.querySelector('.controls')
const themeSelector = document.getElementById('theme-selector')


document.addEventListener('DOMContentLoaded', renderFirst )
itemsLeft()
form.addEventListener('submit', addTodo)
deleteBtn.addEventListener('click',deleted)
state.addEventListener('click',filterTodos)
todosHolder.addEventListener('click', addCompleted)
themeSelector.addEventListener('click', setTheme)

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

function renderFirst(){
    getTodos()
    previousTheme()
}

function addCompleted(e){
    const item = e.target
    if(item.id == 'todo'){
        let index = document.querySelectorAll('#todo')
        for(let i = 0; i < index.length; i++){
            
            if(item == index[i]){
                let todoValue = index[i].nextElementSibling.innerHTML
                console.log(index[i].nextElementSibling.innerHTML)
                if(!index[i].parentElement.classList.contains('completed')){
                    console.log(index[i].parentElement)
                    index[i].parentElement.classList.remove('active')
                    index[i].classList.toggle('input-completed')
                    index[i].parentElement.classList.toggle('completed')

                    
                    let existingTodos = localStorage.getItem('todos')
                    
                    existingTodos = existingTodos ? JSON.parse(existingTodos) : {};

                    existingTodos.forEach(existingTodo =>{
                        console.log(existingTodo)
                        if(todoValue == existingTodo.value){
                            existingTodo['completed'] = true
                            itemsLeft()
                            localStorage.setItem('todos', JSON.stringify(existingTodos))
                        }
                    })
                }else{
                    item.parentElement.classList.add('active')
                    item.classList.toggle('input-completed')
                    item.parentElement.classList.toggle('completed')
                    // localStorage.setItem('todos', JSON.stringify(existingTodos))
                    let existingTodos = localStorage.getItem('todos')

                    existingTodos = existingTodos ? JSON.parse(existingTodos) : {};
                    existingTodos.forEach(existingTodo =>{
                        console.log(existingTodo)
                        if(todoValue == existingTodo.value){
                            existingTodo['completed'] = false
                            itemsLeft()
                            localStorage.setItem('todos', JSON.stringify(existingTodos))
                        }
                    })
                } 
                // localStorage.setItem('todos', JSON.stringify(existingTodos))
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
        itemsLeft()
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
    let todoObj = {
        value: todo,
        completed: false
    }
    todos.push(todoObj);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function deletedTodos(todo){
     let todos;
        if(localStorage.getItem('todos') === null){
            todos = []
        }else{
            todos = JSON.parse(localStorage.getItem('todos'));
        }
        for(let i = 0; i < todos.length; i++){
            if(todos[i]['completed'] === true){
                todos.splice(i,1)
                localStorage.setItem('todos', JSON.stringify(todos))
            }
        } 
        itemsLeft()
}

function getTodos(){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
        console.log(todos)
    }
    todos.forEach(todo =>{
        const div = document.createElement('div');
        div.classList.add('todo');
        // 

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'todo';

        if(todo.completed == true){
            div.classList.toggle('completed')
            input.classList.toggle('input-completed')
            console.log(todo)
            
        }else{
            div.classList.add('active')
        }
        div.appendChild(input)

        const span = document.createElement('span');
        span.innerHTML = todo.value;

        div.appendChild(span)

        todosHolder.appendChild(div)
        itemsLeft()
  })
}

function previousTheme(e){
    const lightMode = document.getElementById('light-mode')
    const darkMode = document.getElementById('dark-mode')
    const todos = document.querySelectorAll('.todo')
    const mainWrapper = document.querySelector('.main-wrapper')
    let previousTheme = localStorage['theme']
    console.log(previousTheme)
    if (previousTheme == 'dark-mode'){
        /* Dark Mode */
        lightMode.style.display = 'none'
        darkMode.style.display = 'flex'
        /* Main Wrapper */
        mainWrapper.classList.add('dark-mode')
        mainWrapper.classList.remove('light-mode')
        /* Input */
        console.log(todosHolder)
        formInput.classList.add('input-dark-mode')
        /* Todos Holder */
        todosHolder.classList.add('todos-dark-mode')
        todosHolder.classList.remove('todos-light-mode')
        /* Todo */
        todos.forEach(todo =>{
            todo.classList.add('todo-dark-mode')
            todo.classList.remove('todo-light-mode')
        })
        
        /* Controls */
        controls.classList.add('controls-dark-mode')
        controls.classList.remove('controls-light-mode')


    }else{
        /* Light Mode */
        lightMode.style.display = 'flex'
        darkMode.style.display = 'none'
        /* Main Wrapper */
        mainWrapper.classList.remove('dark-mode')
        mainWrapper.classList.add('light-mode')
        /* Input */
        formInput.classList.remove('input-dark-mode')
        /* Todos Holder */
        todosHolder.classList.add('todos-light-mode')
        todosHolder.classList.remove('todos-dark-mode')
        /* Todo */
        todos.forEach(todo =>{
            todo.classList.remove('todo-dark-mode')
            todo.classList.add('todo-light-mode')
        })
        /* Controls */
        controls.classList.add('controls-light-mode')
        controls.classList.remove('controls-dark-mode')
 
    }
    
}

function setTheme(e){
    let theme = e.target.id
    console.log('event working')
    if(theme == 'light-mode'){
        /* Save Theme */
        localStorage['theme'] = 'dark-mode'
        previousTheme()
    }else{
        /* Save Theme */
        localStorage['theme'] = 'light-mode'
        previousTheme()
    }
}