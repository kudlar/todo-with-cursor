import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TodoFormProps {
  onAddTodo: (text: string) => Promise<void>
}

export const TodoForm = ({ onAddTodo }: TodoFormProps) => {
  const [value, setValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim()) return
    
    setIsLoading(true)
    try {
      await onAddTodo(value)
      setValue("")
    } catch (error) {
      console.error("Error adding todo:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
        disabled={isLoading}
      />
      <Button type="submit" size="sm" disabled={isLoading}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Add
      </Button>
    </form>
  )
} 