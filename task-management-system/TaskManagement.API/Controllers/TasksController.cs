using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Application.Tasks.Commands.CreateTask;
using TaskManagement.Application.Tasks.Commands.UpdateTask;
using TaskManagement.Application.Tasks.Commands.DeleteTask;
using TaskManagement.Application.Tasks.Queries.GetTasks;
using TaskManagement.Application.Tasks.Queries.GetTaskById;

namespace TaskManagement.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ApiControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<TasksVm>> GetAll([FromQuery] GetTasksQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> Get(Guid id)
        {
            return await Mediator.Send(new GetTaskByIdQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Guid>> Create(CreateTaskCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(Guid id, UpdateTaskCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            await Mediator.Send(new DeleteTaskCommand { Id = id });

            return NoContent();
        }
    }
}

