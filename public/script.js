document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const todoForm = document.getElementById('todo-form');
    const todoTitle = document.getElementById('todo-title');

    // Fetch todos from the backend
    const fetchTodos = async () => {
        try {
            const response = await fetch('/todo');
            const todos = await response.json();
            todoList.innerHTML = '';
            todos.forEach(todo => {
                const li = document.createElement('li');
                li.textContent = todo.title;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.classList.add('edit');
                editButton.addEventListener('click', () => editTodoPrompt(todo.id, todo.title));

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete');
                deleteButton.addEventListener('click', () => deleteTodo(todo.id));

                li.appendChild(editButton);
                li.appendChild(deleteButton);
                todoList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Add a new todo
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = todoTitle.value;
        try {
            const response = await fetch('/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            const newTodo = await response.json();
            fetchTodos(); // Refresh the list
            todoTitle.value = '';
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    });

    // Edit a todo
    const editTodoPrompt = (id, currentTitle) => {
        const newTitle = prompt('Edit todo title:', currentTitle);
        if (newTitle) {
            editTodo(id, newTitle);
        }
    };

    const editTodo = async (id, title) => {
        try {
            await fetch(`/todo?id=${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title }),
            });
            fetchTodos(); // Refresh the list
        } catch (error) {
            console.error('Error editing todo:', error);
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            await fetch(`/todo/delete?id=${id}`, {
                method: 'DELETE',
            });
            fetchTodos(); // Refresh the list
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Initial fetch of todos
    fetchTodos();
});