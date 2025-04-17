import { useState, KeyboardEvent } from "react"
import { Trash2, Edit, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Todo } from "@/lib/todoService"

interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string, completed: boolean) => Promise<void>
  onDeleteTodo: (id: string) => Promise<void>
  onUpdateTodo: (id: string, text: string) => Promise<void>
}

export const TodoItem = ({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onUpdateTodo,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdate = async () => {
    if (!editValue.trim()) return
    
    setIsLoading(true)
    try {
      await onUpdateTodo(todo.id, editValue)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating todo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      await onToggleComplete(todo.id, !todo.completed)
    } catch (error) {
      console.error("Error toggling todo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await onDeleteTodo(todo.id)
    } catch (error) {
      console.error("Error deleting todo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-md mb-2 bg-white">
      {isEditing ? (
        <div className="flex items-center gap-2 flex-1">
          <Input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            autoFocus
            disabled={isLoading}
          />
          <Button size="icon" variant="ghost" onClick={handleUpdate} disabled={isLoading}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setIsEditing(false)} disabled={isLoading}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="h-4 w-4 rounded border-gray-300"
              disabled={isLoading}
            />
            <span className={`flex-1 ${todo.completed ? "line-through text-gray-400" : ""}`}>{todo.text}</span>
          </div>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} disabled={isLoading}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleDelete} disabled={isLoading}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
} 