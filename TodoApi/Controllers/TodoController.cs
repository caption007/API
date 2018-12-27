using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TodoApi.Models;
using System;

#region TodoController
namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;
        #endregion

        public TodoController(TodoContext context)
        {
            _context = context;

            if (_context.TodoItems.Count() == 0)
            {
                _context.TodoItems.Add(new TodoItem { Firstname = "Root", Lastname="computer",Gender="M",PhoneNumber=18933787654,Address= "the White House", Email="12345555@qq.com",Department="Text"});
                _context.SaveChanges();
            }
        }

        #region snippet_GetAll
        [HttpGet]
        public ActionResult<List<TodoItem>> GetAll()
        {
            return _context.TodoItems.ToList();
        }

        #region snippet_GetByID
        [HttpGet("{id}", Name = "GetTodo")]
        public ActionResult<TodoItem> GetById(long id)
        {
            var item = _context.TodoItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }
        #endregion
        #endregion

        #region snippet_Create
        [HttpPost]
        public ActionResult Create(TodoItem item)
        {
            _context.TodoItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = item.Id }, item);
        }
        #endregion

        #region snippet_Update
        [HttpPut("{id}")]
        public ActionResult Update(long id, TodoItem item)
        {
            var todo = _context.TodoItems.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.IsComplete = item.IsComplete;
            todo.Firstname = item.Firstname;
            todo.Lastname = item.Lastname;
            todo.Gender = item.Gender;
            todo.Birthday = item.Birthday;
            todo.PhoneNumber = item.PhoneNumber;
            todo.Address = item.Address;
            todo.Email = item.Email;
            todo.Department = item.Department;
            _context.TodoItems.Update(todo);
            _context.SaveChanges();
            return NoContent();
        }
        #endregion

        #region snippet_Delete
        [HttpDelete("{id}")]
        public ActionResult Delete(long id)
        {
            var todo = _context.TodoItems.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todo);
            _context.SaveChanges();
            return NoContent();
        }
        #endregion
    }
}