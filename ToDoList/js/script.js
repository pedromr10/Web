//selecao de elementos:
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

//funcoes:
const saveTodo = (text) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo"); //cria a div que engloba a atividade
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text; //cria e atribui o titulo referente ao que o usuario mandou no todoForm
    todo.appendChild(todoTitle); //da um append do titulo da atividade na div criada

    //criando o botao finish:
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    //criando o botao edit:
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    //criando o botao remove:
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-todo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    //append no todo:
    todo.appendChild(doneBtn);
    todo.appendChild(editBtn);
    todo.appendChild(removeBtn);

    //append na todoList:
    todoList.appendChild(todo);
    
    //limpa a barra de input depois que o usuario envia:
    todoInput.value = "";
    //colocar o cursor no input:
    todoInput.focus();
}

const toggleForms = () =>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3");
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    });
}

const getSearchTodos = (search) =>{
    const todos = document.querySelectorAll(".todo");
    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3").innerText.toLocaleLowerCase();

        const normalizeSearch = search.toLowerCase();

        todo.style.display = "flex";

        if(!todoTitle.includes(normalizeSearch)){
            todo.style.display = "none";
        }
    });
}

const filterTodos = (filterValue)=>{
    const todos = document.querySelectorAll(".todo");
    switch(filterValue){
        case "all":
            todos.forEach((todo)=> todo.style.display = "flex");
            break;
        case "done":
            todos.forEach((todo)=> todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none");
            break;
        case "todo":
            todos.forEach((todo)=> !todo.classList.contains("done") ? todo.style.display = "flex" : todo.style.display = "none");
            break;
        default:
            break;
    }
}

//eventos:
//adicionando todo na lista:
todoForm.addEventListener("submit", (e)=>{
    e.preventDefault(); //usado para nao reiniciar a pagina ao enviar o form, comportamento padrao do form.
    const inputValue = todoInput.value;

    //verifica se ele enviou com dado válido:
    if(inputValue){
        //salva no todo:
        saveTodo(inputValue);
    }
});

//removendo todo:
document.addEventListener("click", (e)=>{
    const targetEl = e.target; //pega o elemento clicado pelo usuario
    const parentEl = targetEl.closest("div"); //pega o elemento pai do targetEl
    let todoTitle;
    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    }
    //marcando como concluida:
    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }
    //removendo tarefa:
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }
    if(targetEl.classList.contains("edit-todo")){
        toggleForms();
        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
});

cancelEditBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    toggleForms();
});

//obs: quando um botao é um elemento form, nao tem click, apenas submit

editForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    const editInputValue = editInput.value;
    if(editInputValue){
        //atualizar:
        updateTodo(editInputValue);
    }
    toggleForms();
});

searchInput.addEventListener("keyup", (e)=>{
    const search = e.target.value;

    getSearchTodos(search);
});

eraseBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e)=>{
    const filterValue = e.target.value;

    filterTodos(filterValue);
})

