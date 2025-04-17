import { CardFooter } from "@/components/ui/card"
import { Todo } from "@/lib/todoService"

interface TodoFooterProps {
  todos: Todo[]
}

export const TodoFooter = ({ todos }: TodoFooterProps) => {
  const completedCount = todos.filter((todo) => todo.completed).length

  return (
    <CardFooter className="border-t bg-slate-50 flex justify-between text-sm text-gray-500">
      <p>Total tasks: {todos.length}</p>
      <p>Completed: {completedCount}</p>
      <p>Remaining: {todos.length - completedCount}</p>
    </CardFooter>
  )
} 