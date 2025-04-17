import { Todo } from "@/lib/todoService"
import { TodoItem } from "./todo-item"

interface TodoListProps {
  todos: Todo[]
  onToggleComplete: (id: string, completed: boolean) => Promise<void>
  onDeleteTodo: (id: string) => Promise<void>
  onUpdateTodo: (id: string, text: string) => Promise<void>
  isLoading: boolean
}

export const TodoList = ({
  todos,
  onToggleComplete,
  onDeleteTodo,
  onUpdateTodo,
  isLoading,
}: TodoListProps) => {
  if (isLoading) {
    return <p className="text-center py-4">Loading todos...</p>
  }
  
  return (
    <div className="mt-2">
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))
      )}
    </div>
  )
} 