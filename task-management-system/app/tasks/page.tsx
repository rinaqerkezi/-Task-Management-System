"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Task } from "@/lib/types"
import { Search, Plus, Filter, ArrowUpDown, CalendarDays, LayoutList, ListChecks } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { TaskStatusBadge } from "@/components/task-status-badge"
import { PriorityBadge } from "@/components/priority-badge"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [projectFilter, setProjectFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setStatusPriority] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("dueDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [viewType, setViewType] = useState<"list" | "table">("table")
  const [currentPage, setCurrentPage] = useState(1)
  const tasksPerPage = 10

  useEffect(() => {
    // In a real app, this would fetch from the API with filters and sorting
    const fetchTasks = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // This would normally come from an API with proper filtering and pagination
        setTasks([
          {
            id: "1",
            title: "Design new dashboard layout",
            description: "Create wireframes for the new dashboard",
            status: "In Progress",
            priority: "High",
            dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
            assignee: {
              id: "user1",
              name: "Alex Johnson",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj1",
              name: "Website Redesign",
            },
          },
          {
            id: "2",
            title: "Implement authentication flow",
            description: "Add JWT authentication to the API",
            status: "To Do",
            priority: "Medium",
            dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
            assignee: {
              id: "user2",
              name: "Sam Taylor",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj2",
              name: "API Development",
            },
          },
          {
            id: "3",
            title: "Fix navigation bug on mobile",
            description: "Menu doesn't close after selection on mobile devices",
            status: "To Do",
            priority: "High",
            dueDate: new Date(Date.now() + 86400000), // 1 day from now
            assignee: {
              id: "user1",
              name: "Alex Johnson",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj1",
              name: "Website Redesign",
            },
          },
          {
            id: "4",
            title: "Write API documentation",
            description: "Document all endpoints using Swagger",
            status: "Completed",
            priority: "Low",
            dueDate: new Date(Date.now() - 86400000), // 1 day ago
            assignee: {
              id: "user3",
              name: "Jamie Lee",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj2",
              name: "API Development",
            },
          },
          {
            id: "5",
            title: "Develop user profile screen",
            description: "Implement the user profile screen with avatar upload",
            status: "In Progress",
            priority: "Medium",
            dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
            assignee: {
              id: "user4",
              name: "Taylor Smith",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj3",
              name: "Mobile App",
            },
          },
          {
            id: "6",
            title: "Optimize database queries",
            description: "Review and optimize slow-performing database queries",
            status: "To Do",
            priority: "High",
            dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
            assignee: {
              id: "user2",
              name: "Sam Taylor",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj2",
              name: "API Development",
            },
          },
          {
            id: "7",
            title: "Create onboarding flow",
            description: "Design and implement user onboarding flow",
            status: "In Progress",
            priority: "Medium",
            dueDate: new Date(Date.now() + 86400000 * 7), // 7 days from now
            assignee: {
              id: "user1",
              name: "Alex Johnson",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj3",
              name: "Mobile App",
            },
          },
          {
            id: "8",
            title: "Update privacy policy",
            description: "Review and update privacy policy to comply with regulations",
            status: "Completed",
            priority: "Medium",
            dueDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
            assignee: {
              id: "user3",
              name: "Jamie Lee",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj1",
              name: "Website Redesign",
            },
          },
          {
            id: "9",
            title: "Implement push notifications",
            description: "Add push notifications for mobile app",
            status: "To Do",
            priority: "Low",
            dueDate: new Date(Date.now() + 86400000 * 10), // 10 days from now
            assignee: {
              id: "user4",
              name: "Taylor Smith",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj3",
              name: "Mobile App",
            },
          },
          {
            id: "10",
            title: "Refactor authentication service",
            description: "Clean up and optimize the authentication service",
            status: "To Do",
            priority: "Medium",
            dueDate: new Date(Date.now() + 86400000 * 4), // 4 days from now
            assignee: {
              id: "user2",
              name: "Sam Taylor",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj2",
              name: "API Development",
            },
          },
          {
            id: "11",
            title: "Migrate to new API endpoints",
            description: "Update frontend to use new API endpoints",
            status: "In Progress",
            priority: "High",
            dueDate: new Date(Date.now() + 86400000 * 3), // 3 days from now
            assignee: {
              id: "user1",
              name: "Alex Johnson",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj1",
              name: "Website Redesign",
            },
          },
          {
            id: "12",
            title: "Design system dark mode",
            description: "Implement dark mode for the design system",
            status: "To Do",
            priority: "Medium",
            dueDate: new Date(Date.now() + 86400000 * 6), // 6 days from now
            assignee: {
              id: "user3",
              name: "Jamie Lee",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
            project: {
              id: "proj1",
              name: "Website Redesign",
            },
          },
        ])
      } catch (error) {
        console.error("Failed to fetch tasks:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesProject = projectFilter === null || task.project.id === projectFilter
      const matchesStatus = statusFilter === null || task.status === statusFilter
      const matchesPriority = priorityFilter === null || task.priority === priorityFilter

      return matchesSearch && matchesProject && matchesStatus && matchesPriority
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        return sortDirection === "asc"
          ? a.dueDate.getTime() - b.dueDate.getTime()
          : b.dueDate.getTime() - a.dueDate.getTime()
      } else if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 }
        return sortDirection === "asc"
          ? priorityOrder[a.priority as keyof typeof priorityOrder] -
              priorityOrder[b.priority as keyof typeof priorityOrder]
          : priorityOrder[b.priority as keyof typeof priorityOrder] -
              priorityOrder[a.priority as keyof typeof priorityOrder]
      } else {
        // Default to title
        return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      }
    })

  // Calculate pagination
  const indexOfLastTask = currentPage * tasksPerPage
  const indexOfFirstTask = indexOfLastTask - tasksPerPage
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask)
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("asc")
    }
  }

  if (loading) {
    return <div className="container py-10 flex justify-center">Loading tasks...</div>
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage and track all tasks</p>
        </div>
        <Button asChild>
          <Link href="/tasks/new">
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Link>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={projectFilter || ""} onValueChange={(value) => setProjectFilter(value || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="proj1">Website Redesign</SelectItem>
                <SelectItem value="proj2">API Development</SelectItem>
                <SelectItem value="proj3">Mobile App</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter || ""} onValueChange={(value) => setStatusPriority(value || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{filteredTasks.length} tasks found</span>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort("dueDate")}
                className="flex items-center gap-1"
              >
                <CalendarDays className="h-4 w-4" />
                Due Date
                {sortBy === "dueDate" && (
                  <ArrowUpDown
                    className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""} transition-transform`}
                  />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort("priority")}
                className="flex items-center gap-1"
              >
                Priority
                {sortBy === "priority" && (
                  <ArrowUpDown
                    className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""} transition-transform`}
                  />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSort("title")}
                className="flex items-center gap-1"
              >
                Title
                {sortBy === "title" && (
                  <ArrowUpDown
                    className={`h-3 w-3 ${sortDirection === "desc" ? "rotate-180" : ""} transition-transform`}
                  />
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Type Toggle */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex items-center rounded-md border p-1">
          <Button
            variant={viewType === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewType("table")}
            className="h-8 w-8 p-0"
          >
            <LayoutList className="h-4 w-4" />
            <span className="sr-only">Table view</span>
          </Button>
          <Button
            variant={viewType === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewType("list")}
            className="h-8 w-8 p-0"
          >
            <ListChecks className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {/* Task Views */}
      {viewType === "table" ? (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Assignee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTasks.length > 0 ? (
                  currentTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <Link href={`/tasks/${task.id}`} className="font-medium hover:underline">
                          {task.title}
                        </Link>
                      </TableCell>
                      <TableCell>{task.project.name}</TableCell>
                      <TableCell>
                        <TaskStatusBadge status={task.status} />
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={task.priority} />
                      </TableCell>
                      <TableCell>{format(task.dueDate, "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
                            <AvatarFallback>
                              {task.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{task.assignee.name}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No tasks match your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {currentTasks.length > 0 ? (
            currentTasks.map((task) => (
              <Link href={`/tasks/${task.id}`} key={task.id}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{task.title}</h3>
                          <TaskStatusBadge status={task.status} />
                          <PriorityBadge priority={task.priority} />
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                      </div>
                      <div className="flex items-center gap-2 md:gap-4 flex-wrap md:flex-nowrap">
                        <Badge variant="outline">{task.project.name}</Badge>
                        <div className="text-sm text-muted-foreground">{format(task.dueDate, "MMM d, yyyy")}</div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
                            <AvatarFallback>
                              {task.assignee.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{task.assignee.name}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p>No tasks match your filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Pagination */}
      {filteredTasks.length > tasksPerPage && (
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => {
                // Show first page, current page, last page, and one before/after current
                if (
                  number === 1 ||
                  number === totalPages ||
                  number === currentPage ||
                  number === currentPage - 1 ||
                  number === currentPage + 1
                ) {
                  return (
                    <PaginationItem key={number}>
                      <PaginationLink isActive={currentPage === number} onClick={() => paginate(number)}>
                        {number}
                      </PaginationLink>
                    </PaginationItem>
                  )
                } else if (
                  (number === 2 && currentPage > 3) ||
                  (number === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <PaginationEllipsis key={number} />
                }
                return null
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}

