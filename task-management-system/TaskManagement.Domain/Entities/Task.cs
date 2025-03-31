using System;
using TaskManagement.Domain.Enums;
using TaskManagement.Domain.Common;

namespace TaskManagement.Domain.Entities
{
    public class Task : AuditableEntity
    {
        public Guid Id { get; private set; }
        public string Title { get; private set; }
        public string Description { get; private set; }
        public DateTime? DueDate { get; private set; }
        public DateTime? CompletedDate { get; private set; }
        public decimal? EstimatedHours { get; private set; }
        public TaskStatus Status { get; private set; }
        public Priority Priority { get; private set; }
        
        public Guid ProjectId { get; private set; }
        public Project Project { get; private set; }
        
        public Guid? AssigneeId { get; private set; }
        public User Assignee { get; private set; }
        
        public ICollection<Comment> Comments { get; private set; } = new List<Comment>();
        public ICollection<Attachment> Attachments { get; private set; } = new List<Attachment>();

        // Required by EF Core
        private Task() { }

        public Task(Guid id, string title, string description, Guid projectId)
        {
            Id = id;
            Title = title;
            Description = description;
            ProjectId = projectId;
            Status = TaskStatus.ToDo;
            Priority = Priority.Medium;
        }

        public void UpdateTitle(string title)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title cannot be empty", nameof(title));
                
            Title = title;
        }

        public void UpdateDescription(string description)
        {
            Description = description;
        }

        public void SetDueDate(DateTime? dueDate)
        {
            DueDate = dueDate;
        }

        public void SetEstimatedHours(decimal? hours)
        {
            if (hours.HasValue && hours.Value < 0)
                throw new ArgumentException("Estimated hours cannot be negative", nameof(hours));
                
            EstimatedHours = hours;
        }

        public void AssignTo(Guid userId)
        {
            AssigneeId = userId;
        }

        public void Unassign()
        {
            AssigneeId = null;
        }

        public void UpdateStatus(TaskStatus status)
        {
            Status = status;
            
            if (status == TaskStatus.Completed)
            {
                CompletedDate = DateTime.UtcNow;
            }
            else
            {
                CompletedDate = null;
            }
        }

        public void UpdatePriority(Priority priority)
        {
            Priority = priority;
        }

        public void AddComment(Comment comment)
        {
            Comments.Add(comment);
        }

        public void AddAttachment(Attachment attachment)
        {
            Attachments.Add(attachment);
        }
    }
}

