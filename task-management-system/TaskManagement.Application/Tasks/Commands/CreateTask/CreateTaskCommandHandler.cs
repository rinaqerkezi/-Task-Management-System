using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TaskManagement.Application.Common.Interfaces;
using TaskManagement.Domain.Entities;

namespace TaskManagement.Application.Tasks.Commands.CreateTask
{
    public class CreateTaskCommandHandler : IRequestHandler<CreateTaskCommand, Guid>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IDateTime _dateTime;

        public CreateTaskCommandHandler(
            IApplicationDbContext context,
            ICurrentUserService currentUserService,
            IDateTime dateTime)
        {
            _context = context;
            _currentUserService = currentUserService;
            _dateTime = dateTime;
        }

        public async Task<Guid> Handle(CreateTaskCommand request, CancellationToken cancellationToken)
        {
            var entity = new Task(
                Guid.NewGuid(),
                request.Title,
                request.Description,
                request.ProjectId);

            if (request.AssigneeId.HasValue)
            {
                entity.AssignTo(request.AssigneeId.Value);
            }

            if (request.DueDate.HasValue)
            {
                entity.SetDueDate(request.DueDate.Value);
            }

            entity.UpdatePriority(request.Priority);
            
            if (request.EstimatedHours.HasValue)
            {
                entity.SetEstimatedHours(request.EstimatedHours.Value);
            }

            _context.Tasks.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}

