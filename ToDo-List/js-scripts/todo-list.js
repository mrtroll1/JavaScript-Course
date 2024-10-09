renderTodoList();

function renderTodoList () {
    let todoListHTML = '';

    for (i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedObject = localStorage.getItem(key);
        const todoObject = JSON.parse(storedObject);
        const todoName = todoObject.name;
        const todoDate = todoObject.dueDate;
        const html = `
        <div class="todo-wrap">
          <div class="left-column">
            <p>${todoName}</p>
          </div>
          <div class="middle-column">
            <p>${todoDate}</p>
          </div>
          <div class="right-column">
            <button class="delete-button js-delete-button" data-key="${key}"><p>Delete</p></button>
          </div>
        </div>
        ` 
        todoListHTML += html; 
    }

    document.querySelector('.js-todolist-grid').innerHTML = todoListHTML;
    document.querySelectorAll('.js-delete-button').forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        const keyToRemove = deleteButton.getAttribute('data-key'); 
        localStorage.removeItem(keyToRemove); 
        renderTodoList(); 
      });
    });
}

document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addTodo();
  })

function addTodo() {
    const nameInputElement = document.querySelector('.js-todoName-input');
    const todoName = nameInputElement.value;

    const dateInputElement = document.querySelector('.js-todoDate-input');
    const todoDate = dateInputElement.value;

    todo = {
      name: todoName,
      dueDate: todoDate
    }
    localStorage.setItem(`${todo.name}`, JSON.stringify(todo));

    nameInputElement.value = '';
    dateInputElement.value = '';
    renderTodoList();
}

// localStorage.clear();