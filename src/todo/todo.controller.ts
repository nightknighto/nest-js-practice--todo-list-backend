import { Controller, Post } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Res,
} from '@nestjs/common/decorators';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { NotFoundException } from '@nestjs/common/exceptions';

@Controller('todo')
export class TodoController {
  // Inject the TodoService into the TodoController
  // The TodoService is now available as a property of the TodoController
  // The TodoController can now use the TodoService

  // private TodoService: TodoService
  constructor(private todoService: TodoService) {
    // this.todoService = todoService; //equivalent to this line
  }

  @Post('/')
  async create(@Res() res: Response, @Body() createTodoDTO: CreateTodoDTO) {
    const newTodo = this.todoService.addTodo(createTodoDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been submitted successfully!',
      todo: newTodo,
    });
  }

  @Get('/:id')
  async getTodo(@Res() res, @Param('id') id) {
    const todo = this.todoService.getTodo(id);
    if (!todo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json(todo);
  }

  @Get('/')
  async getTodos(@Res() res) {
    const todos = this.todoService.getTodos();
    return res.status(HttpStatus.OK).json(todos);
  }

  @Put('/')
  async editTodo(
    @Res() res,
    @Query('id') id,
    @Body() createTodoDTO: CreateTodoDTO,
  ) {
    const editedTodo = this.todoService.editTodo(id, createTodoDTO);
    if (!editedTodo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been successfully updated',
      todo: editedTodo,
    });
  }

  @Delete('/delete')
  async deleteTodo(@Res() res, @Query('id') id) {
    const deletedTodo = this.todoService.deleteTodo(id);
    if (!deletedTodo) {
      throw new NotFoundException('Todo does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Todo has been deleted!',
      todo: deletedTodo,
    });
  }
}
