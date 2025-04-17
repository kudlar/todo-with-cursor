"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Timestamp } from "firebase/firestore"
import { addTodo, getTodos, toggleTodoComplete, updateTodoText, deleteTodo, Todo } from "@/lib/todoService"
import { ErrorMessage } from "./error-message"
import { TodoHeader } from "./todo-header"
import { TodoForm } from "./todo-form"
import { TodoList } from "./todo-list"
import { TodoFooter } from "./todo-footer"

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load todos on component mount
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todoData = await getTodos()
        setTodos(todoData)
      } catch (error) {
        console.error("Error loading todos:", error)
        setError("Failed to load todos. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    loadTodos()
  }, [])

  // Add a new todo
  const handleAddTodo = async (text: string) => {
    try {
      const newId = await addTodo(text)
      // Add the new todo to the state to avoid an extra fetch
      const newTodo: Todo = {
        id: newId,
        text,
        completed: false,
        createdAt: Timestamp.now(),
      }
      setTodos([newTodo, ...todos])
    } catch (error) {
      console.error("Error adding todo:", error)
      setError("Failed to add todo. Please try again.")
      throw error
    }
  }

  // Toggle todo completion status
  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await toggleTodoComplete(id, completed)
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)))
    } catch (error) {
      console.error("Error toggling todo:", error)
      setError("Failed to update todo. Please try again.")
      throw error
    }
  }

  // Delete a todo
  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error)
      setError("Failed to delete todo. Please try again.")
      throw error
    }
  }

  // Update a todo
  const handleUpdateTodo = async (id: string, text: string) => {
    try {
      await updateTodoText(id, text)
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)))
    } catch (error) {
      console.error("Error updating todo:", error)
      setError("Failed to update todo. Please try again.")
      throw error
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <TodoHeader />
        <CardContent className="p-4">
          {error && <ErrorMessage message={error} />}
          <TodoForm onAddTodo={handleAddTodo} />
          <TodoList 
            todos={todos} 
            onToggleComplete={handleToggleComplete} 
            onDeleteTodo={handleDeleteTodo} 
            onUpdateTodo={handleUpdateTodo}
            isLoading={isLoading}
          />
        </CardContent>
        <TodoFooter todos={todos} />
      </Card>
    </div>
  )
} 