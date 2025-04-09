"use client"

import type React from "react"

import { useState } from "react"
import { PlusCircle, Trash2, Edit, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

// Define the Todo type
interface Todo {
  id: number
  text: string
  completed: boolean
}

// TodoHeader Component
const TodoHeader = () => {
  return (
    <CardHeader className="bg-slate-50 border-b">
      <CardTitle className="text-center text-2xl font-bold">Todo List App</CardTitle>
    </CardHeader>
  )
}

// TodoForm Component
const TodoForm = ({ addTodo }: { addTodo: (text: string) => void }) => {
  const [value, setValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    addTodo(value)
    setValue("")
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Button type="submit" size="sm">
        <PlusCircle className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  )
}

// TodoItem Component
const TodoItem = ({
  todo,
  toggleComplete,
  deleteTodo,
  updateTodo,
}: {
  todo: Todo
  toggleComplete: (id: number) => void
  deleteTodo: (id: number) => void
  updateTodo: (id: number, text: string) => void
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)

  const handleUpdate = () => {
    if (!editValue.trim()) return
    updateTodo(todo.id, editValue)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-md mb-2 bg-white">
      {isEditing ? (
        <div className="flex items-center gap-2 flex-1">
          <Input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={handleUpdate}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}>{todo.text}</span>
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => deleteTodo(todo.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

// TodoList Component
const TodoList = ({
  todos,
  toggleComplete,
  deleteTodo,
  updateTodo,
}: {
  todos: Todo[]
  toggleComplete: (id: number) => void
  deleteTodo: (id: number) => void
  updateTodo: (id: number, text: string) => void
}) => {
  return (
    <div className="mt-2">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))
      )}
    </div>
  )
}

// TodoFooter Component
const TodoFooter = ({ todos }: { todos: Todo[] }) => {
  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <CardFooter className="border-t bg-slate-50 flex justify-between text-sm text-gray-500">
      <p>Total tasks: {todos.length}</p>
      <p>Completed: {completedCount}</p>
      <p>Remaining: {todos.length - completedCount}</p>
    </CardFooter>
  )
}

// Main TodoApp Component
export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Learn React", completed: true },
    { id: 2, text: "Build a Todo App", completed: false },
    { id: 3, text: "Deploy to production", completed: false },
  ])

  // Add a new todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  // Toggle todo completion status
  const toggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  // Delete a todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  // Update a todo
  const updateTodo = (id: number, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <TodoHeader />
        <CardContent className="p-4">
          <TodoForm addTodo={addTodo} />
          <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        </CardContent>
        <TodoFooter todos={todos} />
      </Card>
    </div>
  )
}
