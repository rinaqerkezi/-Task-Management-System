import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TaskStatusBadgeProps {
  status: string
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "To Do":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return <Badge className={cn(getStatusStyle(status))}>{status}</Badge>
}

