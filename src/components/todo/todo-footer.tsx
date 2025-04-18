import { CardFooter } from "@/components/ui/card"
import { Todo } from "@/lib/todoService"

interface TodoFooterProps {
  todos: Todo[]
}



export const TodoFooter = ({ todos }: TodoFooterProps) => {
  const completedCount = todos.filter((todo) => todo.completed).length
  const remainingCount = todos.length - completedCount
  const completionPercentage = todos.length > 0 
    ? Math.round((completedCount / todos.length) * 100) 
    : 0

  return (
    <CardFooter className="border-t bg-slate-50 flex flex-col gap-2 text-sm text-gray-500 p-4">
      <div className="flex justify-between w-full">
        <p>Total tasks: {todos.length}</p>
        <p>Completed: {completedCount}</p>
        <p>Remaining: {remainingCount}</p>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between w-full">
        <p>Progress: {completionPercentage}%</p>
        {todos.length > 0 && completedCount === todos.length && (
          <p className="text-green-600 font-medium">All tasks completed! 🎉</p>
        )}
        {remainingCount > 0 && (
          <p>{remainingCount} task{remainingCount !== 1 ? 's' : ''} left</p>
        )}
      </div>
    </CardFooter>
  )
} 