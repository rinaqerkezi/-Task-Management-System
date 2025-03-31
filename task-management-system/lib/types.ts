export interface User {
  id: string
  name: string
  avatarUrl: string
}

export interface ProjectSummary {
  id: string
  name: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: string
  priority: string
  dueDate: Date
  assignee: User
  project: ProjectSummary
}

export interface Project {
  id: string
  name: string
  description: string
  progress: number
  startDate: Date
  endDate: Date
  teamMembers: User[]
  taskCount: number
  completedTaskCount: number
}

export interface Comment {
  id: string
  content: string
  createdAt: Date
  author: User
}

export interface Attachment {
  id: string
  fileName: string
  fileType: string
  fileSize: number
  uploadedAt: Date
  uploadedBy: User
}

