import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';

interface Todo {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
}

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {
            id: 1,
            title: 'Todo 1',
            description: 'Todo 1 description',
            isDone: false,
        }
    ]

    addTodo(createTodoDTO: CreateTodoDTO) {
        this.todos.push(createTodoDTO);

        return this.todos.at(-1);
    }

    getTodo(id: number): Todo | undefined {
        return this.todos.find(todo => todo.id === id);
    }

    getTodos() {
        return this.todos;
    }

    editTodo(id: number, createTodoDTO: CreateTodoDTO): Todo | undefined {
        const target = this.todos.find( todo => todo.id === id);
        
        if (target) {
            Object.assign(target, createTodoDTO);
        }

        return target;
    }

    deleteTodo(id: number): Todo | undefined {
        const target = this.todos.find( todo => todo.id === id);
        
        if (target) {
            this.todos = this.todos.filter(todo => todo.id !== id);
        }

        return target;
    }

}
