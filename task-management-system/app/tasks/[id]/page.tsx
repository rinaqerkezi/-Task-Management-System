"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { TaskStatusBadge } from "@/components/task-status-badge"
import { PriorityBadge } from "@/components/priority-badge"
import type { Task, Comment, Attachment } from "@/lib/types"
import { ArrowLeft, MessageSquare, Paperclip, Edit, Trash2, Calendar, Flag, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const taskId = params.id as string

  const [task, setTask] = useState<Task | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [loading, setLoading] = useState(true)
  const [newComment, setNewComment] = useState("")

  useEffect(() => {
    // In a real app, this would fetch from the API
    const fetchTaskDetails = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // This data would come from an API
        const mockTask: Task = {
          id: taskId,
          title: "Design new dashboard layout",
          description:
            "Create wireframes for the new dashboard with focus on user experience. Include sections for analytics, recent activity, and quick actions. Consider both desktop and mobile views.",
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
        }

        const mockComments: Comment[] = [
          {
            id: "comment1",
            content: "I've started working on the wireframes. Will share a draft by EOD.",
            createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
            author: {
              id: "user1",
              name: "Alex Johnson",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "comment2",
            content:
              "Looking forward to seeing the drafts. Make sure to include the new branding elements we discussed.",
            createdAt: new Date(Date.now() - 86400000), // 1 day ago
            author: {
              id: "user2",
              name: "Sam Taylor",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
          },
        ]

        const mockAttachments: Attachment[] = [
          {
            id: "attachment1",
            fileName: "dashboard-requirements.pdf",
            fileType: "application/pdf",
            fileSize: 1240000, // in bytes
            uploadedAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
            uploadedBy: {
              id: "user2",
              name: "Sam Taylor",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
          },
          {
            id: "attachment2",
            fileName: "current-dashboard-screenshot.png",
            fileType: "image/png",
            fileSize: 2450000, // in bytes
            uploadedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
            uploadedBy: {
              id: "user1",
              name: "Alex Johnson",
              avatarUrl: "/placeholder.svg?height=40&width=40",
            },
          },
        ]

        setTask(mockTask)
        setComments(mockComments)
        setAttachments(mockAttachments)
      } catch (error) {
        console.error("Failed to fetch task details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTaskDetails()
  }, [taskId])

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    // In a real app, this would submit to the API
    const comment: Comment = {
      id: `comment${comments.length + 1}`,
      content: newComment,
      createdAt: new Date(),
      author: {
        id: "currentUser",
        name: "Current User",
        avatarUrl: "/placeholder.svg?height=40&width=40",
      },
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  if (loading) {
    return <div className="container py-10 flex justify-center">Loading task details...</div>
  }

  if (!task) {
    return <div className="container py-10 flex justify-center">Task not found</div>
  }

  return (
    <div className="container py-10">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tasks
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">{task.title}</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <TaskStatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
          <Link href={`/projects/${task.project.id}`}>
            <Button variant="outline" size="sm" className="h-6">
              {task.project.name}
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{task.description}</p>
            </CardContent>
          </Card>

          <Tabs defaultValue="comments">
            <TabsList>
              <TabsTrigger value="comments" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments ({comments.length})
              </TabsTrigger>
              <TabsTrigger value="attachments" className="flex items-center">
                <Paperclip className="mr-2 h-4 w-4" />
                Attachments ({attachments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments" className="mt-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
                          <AvatarFallback>
                            {comment.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{comment.author.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {format(comment.createdAt, "MMM d, yyyy 'at' h:mm a")}
                            </p>
                          </div>
                          <p className="mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">No comments yet</p>
                  )}
                </CardContent>
                <Separator />
                <CardFooter className="p-6">
                  <div className="w-full space-y-4">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <Button onClick={handleSubmitComment}>Add Comment</Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="attachments" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  {attachments.length > 0 ? (
                    <div className="space-y-4">
                      {attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-md">
                          <div className="flex items-center">
                            <Paperclip className="h-4 w-4 mr-2 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{attachment.fileName}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(attachment.fileSize)} • Uploaded by {attachment.uploadedBy.name} on{" "}
                                {format(attachment.uploadedAt, "MMM d, yyyy")}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground">No attachments yet</p>
                  )}
                </CardContent>
                <CardFooter className="p-6">
                  <Button className="w-full">
                    <Paperclip className="mr-2 h-4 w-4" />
                    Upload Attachment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Due Date</span>
                </div>
                <span>{format(task.dueDate, "MMM d, yyyy")}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Flag className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Priority</span>
                </div>
                <PriorityBadge priority={task.priority} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Status</span>
                </div>
                <TaskStatusBadge status={task.status} />
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Assignee</h3>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
                    <AvatarFallback>
                      {task.assignee.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span>{task.assignee.name}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Change Status
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="h-full">
                  <div className="w-1 h-full bg-border relative">
                    <div className="absolute -left-1.5 top-1 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Task created</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="h-full">
                  <div className="w-1 h-full bg-border relative">
                    <div className="absolute -left-1.5 top-1 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Status changed to "In Progress"</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="h-full">
                  <div className="w-1 h-full relative">
                    <div className="absolute -left-1.5 top-1 w-4 h-4 rounded-full bg-background border-2 border-primary"></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Alex assigned to task</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

