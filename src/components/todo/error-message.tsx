import type React from "react"

export const ErrorMessage = ({ message }: { message: string }) => (
  <div className="bg-red-100 text-red-700 p-2 rounded mb-4" role="alert">
    {message}
  </div>
) 